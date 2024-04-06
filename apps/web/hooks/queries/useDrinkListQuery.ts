import { api } from '@/utils/api';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const drinkListFetcher = async ({
  drinkType,
  sorted = 'popularity_order',
}: {
  drinkType: 'all' | 'beer' | 'tradition';
  sorted?: 'popularity_order';
}) => {
  const response = await api
    .get(`drinks/search?drink_type=${drinkType}&sorted=${sorted}&page=1`)
    .json();
  return response;
};

export const useMainDrinkListQuery = ({
  drinkType,
  sorted = 'popularity_order',
}: {
  drinkType: 'all' | 'beer' | 'tradition';
  sorted?: 'popularity_order';
}): UseQueryResult<DrinksResponse, Error> => {
  return useQuery({
    queryKey: ['drinkList', drinkType, sorted],
    queryFn: () => drinkListFetcher({ drinkType, sorted }),
  });
};
