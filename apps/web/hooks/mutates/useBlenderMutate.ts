import { api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const fetcher = (combinationsId: number) => {
  return api.delete(`combinations/${combinationsId}`);
};

const commentFetcher = (
  combinationsId: number,
  content: string,
  parentId: number = 0,
) => {
  return api
    .post(`combinations/${combinationsId}/comment`, {
      json: {
        content,
        parentId,
      },
    })
    .json();
};

const likeFetcher = (combinationsId: number, like: boolean) => {
  console.log(like);
  if (like) {
    return api.delete(`combinations/${combinationsId}/like`);
  } else {
    return api.post(`combinations/${combinationsId}/like`);
  }
};

const bookmarkFetcher = (combinationsId: number, bookmarkFetcher: boolean) => {
  if (bookmarkFetcher) {
    return api.delete(`combinations/${combinationsId}/bookmark`);
  } else {
    return api.post(`combinations/${combinationsId}/bookmark`);
  }
};

export const useCommentBlenderMutation = (combinationsId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      combinationsId,
      content,
      parentId,
    }: {
      combinationsId: number;
      content: string;
      parentId?: number;
    }) => {
      return commentFetcher(combinationsId, content, parentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blender', combinationsId, 'comments'],
      });
    },
  });
};

export const useDeleteBlenderMutation = () => {
  return useMutation({
    mutationFn: async ({ combinationsId }: { combinationsId: number }) => {
      return fetcher(combinationsId);
    },
  });
};

export const useLikeBlenderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      combinationsId,
      like,
    }: {
      combinationsId: number;
      like: boolean;
    }) => {
      return likeFetcher(combinationsId, like);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blender'] });
    },
  });
};
export const useBookmarkBlenderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      combinationsId,
      bookmark,
    }: {
      combinationsId: number;
      bookmark: boolean;
    }) => {
      return bookmarkFetcher(combinationsId, bookmark);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blender'] });
    },
  });
};
