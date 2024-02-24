import { Flex } from '@mantine/core';
import DrinkDetailWrapper from './(components)/DrinkDetailWrapper';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { usePrefetchDrinkDetail } from '@/hooks/queries/useDrinkDetailQuery';
import { getQueryClient } from '@/utils/getQueryClient';

export default async function Page({ params }: { params: { detail: string } }) {
  const queryClient = getQueryClient();
  await usePrefetchDrinkDetail(params.detail, queryClient);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Flex w={'100%'} h={'100%'} align={'center'} direction={'column'}>
        <DrinkDetailWrapper />
      </Flex>
    </HydrationBoundary>
  );
}
