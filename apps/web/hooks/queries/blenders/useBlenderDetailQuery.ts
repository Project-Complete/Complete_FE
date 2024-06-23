import { api } from '@/utils/api';
import {
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

const blenderDetailFetcher = async (detailId: number) => {
  const response = await api.get(`combinations/${detailId}`).json<Blender>();
  return response;
};

const blenderCommentFetcher = async (detailId: number, page: number) => {
  const response = await api
    .get(`combinations/${detailId}/comment?page=${page}`)
    .json<BlenderCommentResponse>();

  return response;
};

const blenderReplyCommentFetcher = async (
  combinationsId: number,
  page: number,
) => {
  const response = await api
    .get(`combinations/comment/${combinationsId}?page=${page}`)
    .json<BlenderCommentResponse>();

  return response;
};

export const useBlenderDetailQuery = ({
  detailId,
}: {
  detailId: number;
}): UseQueryResult<Blender, Error> => {
  return useQuery({
    queryKey: ['blender', detailId],
    queryFn: () => {
      return blenderDetailFetcher(detailId);
    },
  });
};

export const useBlenderCommentInfiniteQuery = ({
  detailId,
}: {
  detailId: number;
}) => {
  return useInfiniteQuery({
    queryKey: ['blender', detailId, 'comments'],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      return blenderCommentFetcher(detailId, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const page = lastPage as BlenderCommentResponse;
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

export const useBlenderReplyCommentInfiniteQuery = ({
  combinationsId,
}: {
  combinationsId: number;
}) => {
  return useInfiniteQuery({
    queryKey: [`blender`, `replyComment`, combinationsId],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      return blenderReplyCommentFetcher(combinationsId, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const page = lastPage as BlenderCommentResponse;
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
