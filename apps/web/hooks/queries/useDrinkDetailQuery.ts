import { api } from '@/utils/api';
import { QueryClient, UseQueryResult, useQuery } from '@tanstack/react-query';

const drinkDetailFetcher = async ({ detailId }: { detailId: number }) => {
  const response = await api.get(`drinks/detail/${detailId}`).json();
  return response;
};

export const usePrefetchDrinkDetail = async (
  detail: string,
  queryClient: QueryClient,
) => {
  await queryClient.prefetchQuery({
    queryKey: ['drinkDetail', parseInt(detail)],
    queryFn: async () => {
      const response = await drinkDetailFetcher({ detailId: parseInt(detail) });
      return response;
    },
  });
};

export const useDrinkDetailQuery = ({
  detailId,
}: {
  detailId: number;
}): UseQueryResult<Drink, Error> => {
  return useQuery({
    queryKey: ['drinkDetail', detailId],
    queryFn: async () => {
      const response = await drinkDetailFetcher({ detailId });
      console.log(response);
      return response;
    },
  });
};
