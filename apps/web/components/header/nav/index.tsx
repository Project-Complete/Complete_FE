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

const HeaderNavWrapper = () => {
  const [opened, { toggle, open, close }] = useDisclosure(false);

  return (
    // 전체를 감싸는 박스
    <Box pos={`relative`} w={`100%`} h={`100%`}>
      {/* 이쪽에 있는걸 누르면 메뉴가 나옴 */}
      <Box w={`100%`} h={`100%`}>
        <Flex w={`100%`} justify={`center`} h={`100%`}>
          <Flex maw={`1224px`} w={`100%`} align={`center`}>
            <Burger onClick={toggle} />
            <Flex w={152} p={12} m={12} justify={`center`} align={`center`}>
              <Anchor
                component={Link}
                href={'/'}
                p={0}
                className={classes['header-collapse-link']}
              >
                홈
              </Anchor>
            </Flex>
            <div className={classes[`Header-nav-right-line`]}></div>
            <Flex w={152} p={12} m={12} justify={`center`} align={`center`}>
              <UnstyledButton
                onClick={toggle}
                // bg={`none`}
                className={classes['header-collapse-link']}
              >
                주류
              </UnstyledButton>
            </Flex>
            {/* <div className={classes[`Header-nav-right-line`]}></div>
            <Flex w={152} p={12} m={12} justify={`center`} align={`center`}>
              <UnstyledButton
                size={`sm`}
                onClick={toggle}
                p={0}
                className={classes['header-collapse-link']}
              >
                본격적 칠링
              </UnstyledButton>
            </Flex>
            <div className={classes[`Header-nav-right-line`]}></div>
            <Flex w={152} p={12} m={12} justify={`center`} align={`center`}>
              <UnstyledButton
                onClick={toggle}
                p={0}
                className={classes['header-collapse-link']}
              >
                커뮤니티
              </UnstyledButton>
            </Flex> */}
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
            <Flex w={152} p={12} mx={12} justify={`center`}></Flex>
            <Box w={16}></Box>
            {/* 술 */}
            <Flex w={152} p={12} mx={12} align={`center`} direction={`column`}>
              <Anchor
                href={'/drink'}
                component={Link}
                className={classes['header-collapse-link']}
                pb={12}
              >
                전체
              </Anchor>
              <Anchor
                href={'/drink'}
                component={Link}
                className={classes['header-collapse-link']}
                pb={12}
              >
                전통주
              </Anchor>
              <Anchor
                href={'/drink'}
                component={Link}
                className={classes['header-collapse-link']}
                pb={12}
              >
                맥주
              </Anchor>
            </Flex>
            <Box w={16}></Box>
            {/* 커뮤니티 */}
            {/* <Flex w={152} p={12} mx={12} align={`center`} direction={`column`}>
              <Anchor
                href={'/drink'}
                component={Link}
                className={classes['header-collapse-link']}
                pb={12}
              >
                술끼리 안주끼리
              </Anchor>
              <Anchor
                href={'/drink'}
                component={Link}
                className={classes['header-collapse-link']}
                pb={12}
              >
                한잔 말아먹기
              </Anchor>
            </Flex>
            <Box w={16}></Box>
            <Flex w={152} p={12} mx={12} align={`center`} direction={`column`}>
              <Anchor
                href={'/drink'}
                component={Link}
                className={classes['header-collapse-link']}
                pb={12}
              >
                공지사항
              </Anchor>
              <Anchor
                href={'/drink'}
                component={Link}
                className={classes['header-collapse-link']}
                pb={12}
              >
                이벤트
              </Anchor>
            </Flex> */}
          </Flex>
        </Flex>
      </Collapse>
    </Box>
  );
};

export default HeaderNavWrapper;
