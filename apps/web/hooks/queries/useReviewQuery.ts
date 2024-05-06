import { DrinkDetailReview, ReviewList } from '@/types/review';
import { api } from '@/utils/api';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

const reviewListFetcher = async ({
  detailId = null,
  writerId = null,
  page,
  sort = 'latest',
}: {
  detailId?: number | null;
  writerId?: number | null;
  page: number;
  sort?: 'latest';
}) => {
  let url = `reviews?page=${page}&sort=${sort}`;
  if (detailId) {
    url += `&drink-id=${detailId}`;
  }
  if (writerId) {
    url += `&write=${writerId}`;
  }
  const response = await api.get(url).json();
  return response;
};

export const useReviewListQuery = ({
  detailId = null,
  writerId = null,
  sort = 'latest',
}: {
  detailId?: number | null;
  writerId?: number | null;
  sort?: 'latest';
}): UseInfiniteQueryResult<InfiniteData<ReviewList, Error>, Error> => {
  return useInfiniteQuery({
    queryKey: ['reviewList', detailId, writerId, sort],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      reviewListFetcher({
        detailId,
        writerId,
        page: pageParam,
        sort,
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const page = lastPage as ReviewList;
      const totalPage = Math.ceil(
        page.page_info.total_elements / page.page_info.size,
      );
      const nextPage =
        page.page_info.page + 1 >= totalPage ? null : page.page_info.page + 1;
      return nextPage;
    },
  });
};

const reviewDetailFetcher = async (reviewId: number) => {
  const url = `reviews/${reviewId}`;

  const response = await api.get(url).json();
  return response;
};

export const useReviewDetailQuery = ({
  reviewId,
}: {
  reviewId: number;
}): UseQueryResult<DrinkDetailReview, Error> => {
  return useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => reviewDetailFetcher(reviewId),
  });
};
