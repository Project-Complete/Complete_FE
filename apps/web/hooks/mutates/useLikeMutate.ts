import { api } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { getQueryClient } from '@/utils/getQueryClient';

export const useLikeMutate = (drink_id: number) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: () => {
      return api.post(`drinks/${drink_id}/like`);
    },
    onSuccess: data => {
      const oldData = queryClient.getQueryData(['drinkDetail', drink_id]);
      console.log(oldData);
      queryClient.setQueryData(['drinkDetail', drink_id], (oldData: any) => ({
        ...oldData,
        drink_like: !oldData.drink_like,
      }));
    },
    onError: e => {
      console.log('test', e);
    },
  });
};
