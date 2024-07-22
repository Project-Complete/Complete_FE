import { api } from '@/utils/api';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

const blenderListFetcher = async (
  page: number,
  sorted: 'latest' | `popularity`,
  drinkId?: string | null,
) => {
  let url = `combinations/search?page=${page}&sorted=${sorted}`;
  if (drinkId) {
    url + `&drinkId=${drinkId}`;
  }
  const response = await api.get(url).json<BlenderList>();
  return response;
};

export const useBlenderListQuery = ({
  page,
  sorted,
  drinkId,
}: {
  page: number;
  sorted: 'latest' | `popularity`;
  drinkId?: string | null;
}): UseInfiniteQueryResult<InfiniteData<BlenderList, Error>, Error> => {
  return useInfiniteQuery({
    queryKey: ['blender', 'page', page, 'sorted', sorted],
    queryFn: () => {
      return blenderListFetcher(page, sorted, drinkId);
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const page = lastPage as BlenderList;
      const totalPage = Math.ceil(
        page.page_info.total_elements / page.page_info.size,
      );
      const nextPage =
        page.page_info.page + 1 >= totalPage ? null : page.page_info.page + 1;
      return nextPage;
    },
  });
};
