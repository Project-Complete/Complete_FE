import { keepPreviousData } from '@tanstack/react-query';

import { api } from '@/utils/api';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

const drinkListSearchFetcher = async ({
  keyword,
  page,
}: {
  keyword: string;
  page: number;
}) => {
  let url = `main/search?keyword=${keyword}&page=${page}`;
  const response = await api.get(url).json<{ search_drinks: DrinksResponse }>();
  return response;
};

export const useMainSearchDrinkInfinityQuery = ({
  keyword,
}: {
  keyword: string;
}) => {
  return useInfiniteQuery({
    queryKey: ['drinkListSearch', keyword],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      drinkListSearchFetcher({
        keyword,
        page: pageParam,
      }),
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const page = lastPage;
      const totalPage = Math.ceil(
        page.search_drinks.page_info.total_elements /
        page.search_drinks.page_info.size,
      );
      const nextPage =
        page.search_drinks.page_info.page + 1 >= totalPage
          ? null
          : page.search_drinks.page_info.page + 1;
      return nextPage;
    },
  });
};
