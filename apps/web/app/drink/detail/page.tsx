import Detail from '@/components/drinkDetail/Detail';
import DetailDescription from '@/components/drinkDetail/DetailDescription';
import DetailSummary from '@/components/drinkDetail/DetailSummary';
import CustomerReview from '@/components/review/customerReview/CustomerReview';
import { Flex } from '@mantine/core';

export default function Page(): JSX.Element {
  return (
    <Flex w={'100%'} h={'100%'} align={'center'} direction={'column'}>
      <DetailSummary />
      <Flex
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
