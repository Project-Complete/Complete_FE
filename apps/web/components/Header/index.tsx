'use client';

import classes from './HeaderWrapper.module.css';
import { Flex } from '@mantine/core';
import HeaderNav from './Nav';
const HeaderWrapper = () => {
  return (
    <Flex
      w={'100%'}
      h={232}
      direction={`column`}
      justify={`center`}
      align={`center`}
      pos={`relative`}
    >
      <Flex w={`100%`} h={52} bg={`#F2F3F3`}></Flex>
      <Flex w={`100%`} h={120} className={classes[`header-center`]}></Flex>
      <div className={classes[`header-nav-wrapper`]}>
        <HeaderNav />
      </div>
    </Flex>
  );
};

export default HeaderWrapper;
