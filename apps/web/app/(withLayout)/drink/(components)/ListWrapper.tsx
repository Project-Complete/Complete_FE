'use client';

import { Box, Flex, Text } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import classes from './ListWrapper.module.scss';
import DrinkList from './List';

const drinkType = {
  all: {
    first: '모든 ',
    last: '주류',
  },
  beer: { first: '변함없는 스테디 셀러인 ', last: '맥주' },
  tradition: { first: 'MZ세대 열풍의 ', last: '전통주' },
};

const DrinkListWrapper = () => {
  const searchParams = useSearchParams();
  const title = searchParams?.get('select') as
    | 'all'
    | 'beer'
    | 'tradition'
    | undefined;

  if (title) {
    return (
      <Box w={'100%'} h={'100%'}>
        <Flex>
          <Text fz={'1.5rem'} lh={'2.5rem'} fw={'800'} mr={'0.5rem'}>
            {drinkType[title].first}
          </Text>
          <Text fz={'1.5rem'} lh={'2.5rem'} fw={'800'} className={classes.text}>
            {drinkType[title].last}
          </Text>
        </Flex>
        <Box w={'100%'} h={'100%'}>
          <DrinkList drinkType={title} />
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

export default DrinkListWrapper;
