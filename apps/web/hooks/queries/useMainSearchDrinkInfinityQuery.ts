import { api } from '@/utils/api';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

type useMainSearchDrinkFetcherPropsType = {
  keyword: string;
  pageParam: number;
};

const useMainSearchDrinkFetcher = async ({
  keyword,
  pageParam,
}: useMainSearchDrinkFetcherPropsType) => {
  const url = `/main/search?keyword=${keyword}&page=${pageParam}`;
  console.log('url', url);
  const response = await api.get(url).json();
  return response as any;
};

const useMainSearchDrinkInfinityQuery = ({
  keyword,
}: {
  keyword: string;
}): UseInfiniteQueryResult<InfiniteData<DrinksResponse, Error>, Error> => {
  return useInfiniteQuery({
    queryKey: ['main/search', keyword],
    queryFn: ({ pageParam }) =>
      useMainSearchDrinkFetcher({ keyword, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: DrinksResponse) => {
      const page = lastPage;
      const totalPage = Math.ceil(
        page.page_info.total_elements / page.page_info.size,
      );
      const nextPage =
        page.page_info.page + 1 >= totalPage ? null : page.page_info.page + 1;
      return nextPage;
    },
  });
};
export default useMainSearchDrinkInfinityQuery;
