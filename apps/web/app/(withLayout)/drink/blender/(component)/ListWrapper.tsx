'use client';

import { Box, Flex, Text, em } from '@mantine/core';

import classes from './List.module.scss';
import BlenderList from './List';
import BlenderListSearchWrapper from './SearchWrapper';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMediaQuery } from '@mantine/hooks';

const BlenderListWrapper = () => {
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery(`(max-width:${em(768)})`);
  const id =
    searchParams && searchParams.has(`drinkId`) && searchParams.get(`drinkId`);

  const [drinkId, setDrinkId] = useState<number | undefined>(
    id ? parseInt(id) : undefined,
  );

  return (
    <Box
      w={'100%'}
      h={'100%'}
      pt={isMobile ? 24 : 0}
      pb={isMobile ? 40 : 0}
      px={isMobile ? 24 : 0}
    >
      <Flex justify={`space-between`} className={classes.listWrapper}>
        <Flex>
          <Text
            lh={`2.5rem`}
            fw={800}
            fz={isMobile ? `18px` : `1.5rem`}
            mr={`0.5rem`}
          >
            칠러들의
          </Text>
          <Text
            lh={`2.5rem`}
            fw={800}
            fz={isMobile ? `18px` : `1.5rem`}
            mr={`0.5rem`}
            className={classes.text}
          >
            본격 한 잔을
          </Text>
          <Text
            lh={`2.5rem`}
            fw={800}
            fz={isMobile ? `18px` : `1.5rem`}
            mr={`0.5rem`}
          >
            소개할게요!
          </Text>
        </Flex>
        <Flex
          justify={isMobile ? `flex-end` : `center`}
          align={`center`}
          mb={isMobile ? `1rem` : 0}
        >
          <BlenderListSearchWrapper setDrinkId={setDrinkId} />
        </Flex>
      </Flex>
      <Box w={`100%`} h={`100%`}>
        <BlenderList drinkId={drinkId} />
      </Box>
    </Box>
  );
};

export default BlenderListWrapper;
