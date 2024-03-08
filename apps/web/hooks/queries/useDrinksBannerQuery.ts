import { api } from '@/utils/api';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const useDrinksBannerFetcher = async () => {
  const url = `drinks/banner`;
  const response = await api.get(url).json();
  return response;
};

export const useDrinksBannerQuery = (): UseQueryResult<
  DrinkBannerResponseDto,
  Error
> => {
  return useQuery({
    queryKey: ['drink', 'banner'],
    queryFn: () => useDrinksBannerFetcher(),
  });
};
