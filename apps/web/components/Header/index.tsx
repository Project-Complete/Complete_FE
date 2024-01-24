'use client';

import classes from './HeaderWrapper.module.css';
import { Button, Flex, Burger, UnstyledButton } from '@mantine/core';
const HeaderWrapper = () => {
  return (
    <Flex
      w={'100%'}
      h={232}
      direction={`column`}
      justify={`center`}
      align={`center`}
    >
      <Flex w={`100%`} h={52} bg={`#F2F3F3`}></Flex>
      <Flex w={`100%`} h={120} className={classes[`header-center`]}></Flex>
      <Flex
        w={`100%`}
        h={60}
        justify={`flex-start`}
        align={`center`}
        className={classes[`max-width`]}
      >
        <Burger></Burger>
        <UnstyledButton>메인 페이지</UnstyledButton>
        <UnstyledButton>술 리뷰</UnstyledButton>
        <UnstyledButton>술 조합</UnstyledButton>
        <UnstyledButton>공지사항 및 이벤트</UnstyledButton>
        <UnstyledButton>커뮤니티</UnstyledButton>
      </Flex>
    </Flex>
  );
};

export default HeaderWrapper;
