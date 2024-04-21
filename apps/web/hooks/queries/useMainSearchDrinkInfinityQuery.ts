// import { api } from '@/utils/api';
// import {
//   InfiniteData,
//   UseInfiniteQueryResult,
//   useInfiniteQuery,
// } from '@tanstack/react-query';

// type useMainSearchDrinkFetcherPropsType = {
//   keyword: string;
//   pageParam: number;
// };

// const useMainSearchDrinkFetcher = async ({
//   keyword,
//   pageParam,
// }: useMainSearchDrinkFetcherPropsType) => {
//   const url = `/main/search?keyword=${keyword}&page=${pageParam}`;
//   const response = await api.get(url).json();
//   return response as DrinksResponse;
// };

// const useMainSearchDrinkInfinityQuery = ({
//   keyword,
// }: {
//   keyword: string;
// }): UseInfiniteQueryResult<InfiniteData<DrinksResponse, Error>, Error> => {
//   return useInfiniteQuery({
//     queryKey: ['main/search', keyword],
//     queryFn: ({ pageParam }) =>
//       useMainSearchDrinkFetcher({ keyword, pageParam }),

//     initialPageParam: 0,
//     // getNextPageParam: (lastPage: DrinksResponse) => {
//     //   const page = lastPage;
//     //   const totalPage = Math.ceil(
//     //     page.page_info.total_elements / page.page_info.size,
//     //   );
//     //   const nextPage =
//     //     page.page_info.page + 1 >= totalPage ? null : page.page_info.page + 1;
//     //   return nextPage;
//     // },
//     getNextPageParam: lastPage => {
//       const page = lastPage as DrinksResponse;
//       const totalPage = Math.ceil(
//         page.page_info.total_elements / page.page_info.size,
//       );
//       const nextPage =
//         page.page_info.page + 1 >= totalPage ? null : page.page_info.page + 1;
//       return nextPage;
//     },
//   });
// };
// export default useMainSearchDrinkInfinityQuery;

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
  const response = await api.get(url).json();
  return response as DrinksResponse;
};

export const useMainSearchDrinkInfinityQuery = ({
  keyword,
}: {
  keyword: string;
}): UseInfiniteQueryResult<InfiniteData<DrinksResponse, Error>, Error> => {
  console.log('작동하니', keyword);
  return useInfiniteQuery({
    queryKey: ['drinkListSearch', keyword],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      drinkListSearchFetcher({
        keyword,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const page = lastPage;
      console.log('lastPage', lastPage);
      const totalPage = Math.ceil(
        page.page_info.total_elements / page.page_info.size,
      );
      const nextPage =
        page.page_info.page + 1 >= totalPage ? null : page.page_info.page + 1;
      return nextPage;
    },
  });
};
