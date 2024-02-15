'use client';
import Detail from '@/components/drinkDetail/Detail';
import DetailDescription from '@/components/drinkDetail/DetailDescription';
import DetailSummary from '@/components/drinkDetail/DetailSummary';
import CustomerReview from '@/components/review/customerReview/CustomerReview';
import { Flex } from '@mantine/core';
import classes from './DetailPage.module.css';
import { useDrinkDetailQuery } from '@/hooks/queries/useDrinkDetailQuery';
import { useParams } from 'next/navigation';

export default function Page(): JSX.Element {
  const params = useParams();
  console.log(params);
  let detailId = params && params.detail ? params.detail : '1';
  if (
    params &&
    params.detail &&
    Array.isArray(params.detail) &&
    params.detail[0]
  ) {
    detailId = params.detail[0];
  }
  const { data } = useDrinkDetailQuery({ detailId: 1 });
  console.log(data);
  return (
    <Flex w={'100%'} h={'100%'} align={'center'} direction={'column'}>
      <DetailSummary />
      <Flex
        className={classes.DetailPageMainWrapper}
        w={'100%'}
        h={'100%'}
        maw={1224}
        align={'center'}
        direction={'column'}
      >
        <Detail />
        <DetailDescription />
        <CustomerReview />
      </Flex>
    </Flex>
  );
}
