import { UserInfoPatch } from '@/types/userInfo';
import { api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useProfilePatchMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ profile }: { profile: UserInfoPatch }) => {
      const response = await api
        .patch(`users`, {
          json: {
            ...profile,
          },
        })
        .json();
      return response;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
    onError: e => {
      console.log('test', e);
    },
  });
};
