import { Flex } from '@mantine/core';
import DrinkDetailWrapper from './(components)/DrinkDetailWrapper';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { usePrefetchDrinkDetail } from '@/hooks/queries/useDrinkDetailQuery';
import { getQueryClient } from '@/utils/getQueryClient';
import { cookies } from 'next/headers';

export default async function Page({ params }: { params: { detail: string } }) {
  const queryClient = getQueryClient();
  await usePrefetchDrinkDetail(params.detail, queryClient);

  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Flex w={'100%'} h={'100%'} align={'center'} direction={'column'}>
        <DrinkDetailWrapper
          accessToken={accessToken}
          refreshToken={refreshToken}
        />
      </Flex>
    </HydrationBoundary>
  );
}
