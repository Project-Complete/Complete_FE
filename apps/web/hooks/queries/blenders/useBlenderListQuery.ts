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
    url += `&drink_id=${drinkId}`;
  }
  console.log(url);

  const response = await api.get(url).json<BlenderList>();
  return response;
};

const myBlenderListFetcher = async (page: number) => {
  const url = `users/combinations?page=${page}&size=8`;

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
    queryKey: ['blender', 'page', page, 'sorted', sorted, drinkId],
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
export const useMyBlenderListQuery = ({
  page,
}: {
  page: number;
}): UseInfiniteQueryResult<InfiniteData<BlenderList, Error>, Error> => {
  return useInfiniteQuery({
    queryKey: ['blender', page, `myBlender`],
    queryFn: () => {
      return myBlenderListFetcher(page);
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
