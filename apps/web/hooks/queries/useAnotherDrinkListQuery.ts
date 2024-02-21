import { DetailRecommendDrinkList } from '@/types/drinks';
import { api } from '@/utils/api';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const drinkDetailFetcher = async ({
  detailId,
  rateName,
}: {
  detailId: number;
  rateName: string;
}) => {
  const response = await api
    .get(`drink/${detailId}/search?rate=${rateName}`)
    .json();
  return response;
};

export const useAnotherDrinkListQuery = ({
  detailId,
  rateName,
}: {
  detailId: number;
  rateName: string;
}): UseQueryResult<DetailRecommendDrinkList, Error> => {
  return useQuery({
    queryKey: ['recommandDrinkList', detailId, rateName],
    queryFn: async () => {
      const response = await drinkDetailFetcher({ detailId, rateName });
      return response;
    },
  });
};
