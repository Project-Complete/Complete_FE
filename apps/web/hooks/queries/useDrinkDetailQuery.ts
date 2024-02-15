import { Drink } from '@/types/drinks';
import { api } from '@/utils/api';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const drinkDetailFetcher = async ({ detailId }: { detailId: number }) => {
  const response = await api
    .get(`drink/detail/${detailId}`)
    .json();
  console.log(response);
  return response;
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
