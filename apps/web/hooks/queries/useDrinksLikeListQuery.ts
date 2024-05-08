import { api } from '@/utils/api';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

const drinkLikeListFetcher = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  let url = `users/drinks/like?page=${page}&size=${size}`;
  const response = await api.get(url).json();
  return response;
};

export const useDrinksLikeListQuery = ({
  size,
}: {
  size: number;
}): UseInfiniteQueryResult<InfiniteData<DrinksResponse, Error>, Error> => {
  return useInfiniteQuery({
    queryKey: ['drinks', 'like'],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      drinkLikeListFetcher({ page: pageParam, size }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const page = lastPage as DrinksResponse;
      const totalPage = Math.ceil(
        page.page_info.total_elements / page.page_info.size,
      );
      const nextPage =
        page.page_info.page + 1 >= totalPage ? null : page.page_info.page + 1;
      return nextPage;
    },
    gcTime: 50000,
    staleTime: 0,
  });
};
