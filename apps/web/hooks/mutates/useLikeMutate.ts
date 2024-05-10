import { api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLikeMutate = (drink_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return api.post(`drinks/${drink_id}/like`);
    },
    onSuccess: data => {
      // const updater = () => {
      //   const old = queryClient.getQueryData([
      //     'drinkDetail',
      //     drink_id,
      //   ]) as Drink;
      //   console.log(old);
      //   return {
      //     ...old,
      //     drink_like: !old.drink_like,
      //   };
      // };
      // queryClient.setQueryData(['drinkDetail', drink_id], updater);
      queryClient.invalidateQueries({ queryKey: ['drinks', 'like'] });
      queryClient.invalidateQueries({ queryKey: ['drinkList'] });
      queryClient.invalidateQueries({ queryKey: ['drinkDetail', drink_id] });
    },
    onError: e => {
      console.log('test', e);
    },
  });
};

export const useUnLikeMutate = (drink_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return api.delete(`drinks/${drink_id}/like`);
    },
    onSuccess: data => {
      // const updater = () => {
      //   const old = queryClient.getQueryData([
      //     'drinkDetail',
      //     drink_id,
      //   ]) as Drink;
      //   return {
      //     ...old,
      //     drink_like: !old.drink_like,
      //   };
      // };
      queryClient.invalidateQueries({ queryKey: ['drinks', 'like'] });
      queryClient.invalidateQueries({ queryKey: ['drinkList'] });
      queryClient.invalidateQueries({ queryKey: ['drinkDetail', drink_id] });
    },
    onError: e => {
      console.log('test', e);
    },
  });
};
