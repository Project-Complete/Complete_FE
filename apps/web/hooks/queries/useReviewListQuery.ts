import { ReviewList } from '@/types/review';
import { api } from '@/utils/api';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

const reviewListFetcher = async ({
  detailId,
  writerId = null,
  page,
  sort = 'latest',
}: {
  detailId: number;
  writerId?: number | null;
  page: number;
  sort?: 'latest';
}) => {
  let url = `reviews?drink-id=${detailId}&page=${page}&sort=${sort}`;
  if (writerId) {
    url = `reviews?drink-id=${detailId}&write=${writerId}&page=${page}&sort=${sort}`;
  }
  const response = await api.get(url).json();
  return response;
};

export const useReviewListQuery = ({
  detailId,
  writerId = null,
  sort = 'latest',
}: {
  detailId: number;
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
