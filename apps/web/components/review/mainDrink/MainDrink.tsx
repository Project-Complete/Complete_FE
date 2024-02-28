'use client';

import { Flex } from '@mantine/core';
import MainDrinkHeader from './MainDrinkHeader';
import MainDrinkContent from './MainDrinkContent';
import MainDrinkFooter from './MainDrinkFooter';
import { useState } from 'react';

const MainDrink = () => {
  const [activeState, setActiveState] = useState<'all' | 'beer' | 'tradition'>(
    'all',
  );

  const activeStateHandler = (value: 'all' | 'beer' | 'tradition') => {
    setActiveState(value);
  };
  return (
    <Flex w={'100%'} maw={1224} direction={'column'}>
      <MainDrinkHeader
        activeState={activeState}
        activeStateHandler={activeStateHandler}
      />
      <MainDrinkContent drinkType={activeState} />
      <MainDrinkFooter />
    </Flex>
  );
};
export default MainDrink;
