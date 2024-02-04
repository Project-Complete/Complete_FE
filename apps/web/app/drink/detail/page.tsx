import Detail from '@/components/drinkDetail/Detail';
import CustomerReview from '@/components/review/customerReview/CustomerReview';
import { Flex } from '@mantine/core';

export default function Page(): JSX.Element {
  return (
    <Flex w={'100%'} h={'100%'} align={'center'} direction={'column'}>
      <Flex
        w={'100%'}
        h={'100%'}
        maw={1224}
        align={'center'}
        direction={'column'}
      >
        <Detail />
        <CustomerReview />
      </Flex>
    </Flex>
  );
}
