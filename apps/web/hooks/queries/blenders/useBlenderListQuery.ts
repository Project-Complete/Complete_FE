import { api } from '@/utils/api';
import {
    InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

const blenderListFetcher = async (page: number, sorted: 'latest') => {
  const response = await api
    .get(`combinations/search?page=${page}&sorted=${sorted}`)
    .json<BlenderList>();
  return response;
};

export const useBlenderListQuery = ({
  page,
  sorted,
}: {
  page: number;
  sorted: 'latest';
}): UseInfiniteQueryResult<InfiniteData<BlenderList, Error>,Error> => {
  return useInfiniteQuery({
    queryKey: ['blender', 'page', page, 'sorted', sorted],
    queryFn: () => {
      return blenderListFetcher(page, sorted);
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
