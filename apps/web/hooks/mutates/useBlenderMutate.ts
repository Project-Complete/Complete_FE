import { api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteCombinationfetcher = (combinationsId: number) => {
  return api.delete(`combinations/${combinationsId}`);
};

const commentFetcher = (
  combinationsId: number,
  content: string,
  parentId: number = 0,
) => {
  if (parentId !== 0) {
    return api
      .post(`combinations/${combinationsId}/comment`, {
        json: {
          content,
          parent_combination_comment_id: parentId,
        },
      })
      .json();
  } else {
    return api.post(`combinations/${combinationsId}/comment`, {
      json: {
        content,
        parent_combination_comment_id: null,
      },
    });
  }
};

const blenderReplyCommentDelete = async (commentId: number) => {
  const response = await api.delete(`combinations/comment/${commentId}`).json();

  return response;
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

export const useCommentBlenderDelete = (combinationsId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentId }: { commentId: number }) => {
      return blenderReplyCommentDelete(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blender', combinationsId, 'comments'],
      });
      queryClient.invalidateQueries({
        queryKey: [`blender`, `replyComment`],
      });
    },
  });
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
      console.log(parentId);
      return commentFetcher(combinationsId, content, parentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blender', combinationsId, 'comments'],
      });
      queryClient.invalidateQueries({
        queryKey: [`blender`, `replyComment`],
      });
    },
  });
};

export const useDeleteBlenderMutation = () => {
  return useMutation({
    mutationFn: async ({ combinationsId }: { combinationsId: number }) => {
      return deleteCombinationfetcher(combinationsId);
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
