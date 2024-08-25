import { keepPreviousData } from '@tanstack/react-query';

import { api } from '@/utils/api';
import {

  useInfiniteQuery,
} from '@tanstack/react-query';

const combinationSearchFetcher = async ({
  sorted = 'popularity',
  keyword,
  page,
}: {
  sorted?: 'popularity';
  page?: number;
  keyword?: string;
}) => {

  let url = `combinations/search?keyword=${keyword}&page=${page}`;
  const searchParams = new URLSearchParams();
  keyword && searchParams.append('keyword', keyword);
  page && searchParams.append('page', page.toString());
  searchParams.append('sorted', sorted);
  const response = await api.get(url, {
    searchParams
  }).json<CombinationsResponse>();
  return response;
};

export const useCombinationSearchInfinityQuery = ({
  keyword,
  sorted = 'popularity',

}: {
  sorted?: 'popularity';
  keyword?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ['combinationListSearch', keyword],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      combinationSearchFetcher({
        page: pageParam, sorted, keyword
      }),
    placeholderData: keepPreviousData,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const page = lastPage;
      const totalPage = Math.ceil(
        page.page_info.total_elements /
        page.page_info.size,
      );
      const nextPage =
        page.page_info.page + 1 >= totalPage
          ? null
          : page.page_info.page + 1;
      return nextPage;
    },
  });
};
