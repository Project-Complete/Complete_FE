'use client';
import Link from 'next/link';
import {
  Box,
  Burger,
  Button,
  Collapse,
  Flex,
  Anchor,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './HeaderNav.module.scss';
import React from 'react';
import { NAVIGATION_LIST } from '@/constants/navigation';

const HeaderNavWrapper = () => {
  const [opened, { toggle, open, close }] = useDisclosure(false);

  return (
    // 전체를 감싸는 박스
    <Box pos={`relative`} w={`100%`} h={`100%`}>
      {/* 이쪽에 있는걸 누르면 메뉴가 나옴 */}
      <Box w={`100%`} h={`100%`}>
        <Flex w={`100%`} justify={`center`} h={`100%`}>
          <Flex maw={`1224px`} w={`100%`} align={`center`}>
            <Burger opened={opened} onClick={toggle} />
            {NAVIGATION_LIST.map((nav, index) => {
              return (
                <Flex
                  key={index}
                  w={152}
                  p={12}
                  m={12}
                  justify={`center`}
                  align={`center`}
                >
                  {nav.href ? (
                    <Anchor
                      component={Link}
                      href={'/'}
                      p={0}
                      className={classes['header-collapse-link']}
                    >
                      홈
                    </Anchor>
                  ) : (
                    <UnstyledButton
                      size={`sm`}
                      onClick={toggle}
                      p={0}
                      className={classes['header-collapse-link']}
                    >
                      {nav.name}
                    </UnstyledButton>
                  )}
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Box>
      {/* 나올 메뉴 */}
      <Collapse
        in={opened}
        pos={`absolute`}
        w={`100%`}
        bg={`#FFF`}
        className={classes.Collapse}
        onMouseOut={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          console.log('mouse out!');
          if (
            !e.relatedTarget ||
            !(e.currentTarget as Node).contains(e.relatedTarget as Node)
          )
            close();
        }}
      >
        <Flex w={`100%`} justify={`center`}>
          <Flex maw={`1224px`} w={`100%`}>
            <Box w={34} h={34} />
            {NAVIGATION_LIST.map((nav, index) => {
              return (
                <>
                  <Flex
                    w={152}
                    p={12}
                    mx={12}
                    align={`center`}
                    direction={`column`}
                  >
                    {nav.menuList.map((menu, index) => {
                      return (
                        <Anchor
                          href={menu.href}
                          component={Link}
                          className={classes['header-collapse-link']}
                          pb={12}
                        >
                          {menu.name}
                        </Anchor>
                      );
                    })}
                  </Flex>
                </>
              );
            })}
          </Flex>
        </Flex>
      </Collapse>
    </Box>
  );
};

export default HeaderNavWrapper;
