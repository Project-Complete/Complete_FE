import { api } from '@/utils/api';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

const drinkListFetcher = async ({
  drinkType,
  sorted = 'popularity',
  page = 1,
}: {
  drinkType: 'all' | 'beer' | 'tradition';
  sorted?: 'popularity';
  page?: number;
}) => {
  const response = await api
    .get(`drinks/search?drink_type=${drinkType}&sorted=${sorted}&page=${page}`)
    .json<DrinksResponse>();
  return response;
};

export const useMainDrinkListQuery = ({
  drinkType,
  sorted = 'popularity',
}: {
  drinkType: 'all' | 'beer' | 'tradition';
  sorted?: 'popularity';
}): UseQueryResult<DrinksResponse, Error> => {
  return useQuery({
    queryKey: ['mainDrinkList', drinkType, sorted],
    queryFn: () => drinkListFetcher({ drinkType, sorted }),
  });
};

export const useDrinkListQuery = ({
  drinkType,
  sorted = 'popularity',
}: {
  drinkType: 'all' | 'beer' | 'tradition';
  sorted?: 'popularity';
}): UseInfiniteQueryResult<InfiniteData<DrinksResponse, Error>, Error> => {
  return useInfiniteQuery({
    queryKey: ['drinkList', drinkType, sorted],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      drinkListFetcher({ page: pageParam, drinkType, sorted }),
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
