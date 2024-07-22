import { api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLikeMutate = (drink_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return api.post(`drinks/${drink_id}/like`);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['drinks', 'like'] });
      queryClient.invalidateQueries({ queryKey: ['drinkList'] });
      queryClient.invalidateQueries({ queryKey: ['drinkDetail', drink_id] });
      queryClient.invalidateQueries({ queryKey: ['blender'] });
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
      queryClient.invalidateQueries({ queryKey: ['blender'] });
      queryClient.invalidateQueries({ queryKey: ['drinks', 'like'] });
      queryClient.invalidateQueries({ queryKey: ['drinkList'] });
      queryClient.invalidateQueries({ queryKey: ['drinkDetail', drink_id] });
    },
    onError: e => {
      console.log('test', e);
    },
  });
};
