'use client';
import Link from 'next/link';
import { Box, Burger, Button, Collapse, Flex, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './HeaderNav.module.css';

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
                href={'/'}
                component={Link}
                size={`sm`}
                fw={600}
                c={`#000000A6`}
                p={0}
                bg={`none`}
              >
                홈
              </Anchor>
            </Flex>
            <div className={classes[`Header-nav-right-line`]}></div>
            <Flex w={152} p={12} m={12} justify={`center`} align={`center`}>
              <Button
                size={`sm`}
                fw={600}
                onClick={toggle}
                c={`#000000A6`}
                bg={`none`}
              >
                술
              </Button>
            </Flex>
            <div className={classes[`Header-nav-right-line`]}></div>
            <Flex w={152} p={12} m={12} justify={`center`} align={`center`}>
              <Button
                size={`sm`}
                fw={600}
                onClick={toggle}
                c={`#000000A6`}
                bg={`none`}
                w={`100%`}
                p={0}
              >
                커뮤니티
              </Button>
            </Flex>
            <div className={classes[`Header-nav-right-line`]}></div>
            <Flex w={152} p={12} m={12} justify={`center`} align={`center`}>
              <Button
                size={`sm`}
                fw={600}
                onClick={toggle}
                c={`#000000A6`}
                bg={`none`}
                w={`100%`}
                p={0}
              >
                공지사항 및 이벤트
              </Button>
            </Flex>
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
                size={`sm`}
                fw={600}
                onClick={toggle}
                c={`#000000A6`}
                bg={`none`}
                underline='never'
                pb={12}
              >
                전체
              </Anchor>
              <Anchor
                href={'/drink'}
                component={Link}
                size={`sm`}
                fw={600}
                onClick={toggle}
                c={`#000000A6`}
                bg={`none`}
                underline='never'
                p={12}
              >
                전통주
              </Anchor>
              <Anchor
                href={'/drink'}
                component={Link}
                size={`sm`}
                fw={600}
                onClick={toggle}
                c={`#000000A6`}
                bg={`none`}
                underline='never'
                p={12}
              >
                맥주
              </Anchor>
            </Flex>
            <Box w={16}></Box>
            {/* 커뮤니티 */}
            <Flex w={152} p={12} mx={12} align={`center`} direction={`column`}>
              <Anchor
                href={'/drink'}
                component={Link}
                size={`sm`}
                fw={600}
                onClick={toggle}
                c={`#000000A6`}
                bg={`none`}
                underline='never'
                pb={12}
              >
                술끼리 안주끼리 조합
              </Anchor>
              <Anchor
                href={'/drink'}
                component={Link}
                size={`sm`}
                fw={600}
                onClick={toggle}
                c={`#000000A6`}
                bg={`none`}
                underline='never'
                p={12}
              >
                한잔 말아먹기
              </Anchor>
            </Flex>
            <Box w={16}></Box>
            <Flex w={152} p={12} mx={12} align={`center`} direction={`column`}>
              <Anchor
                href={'/drink'}
                component={Link}
                size={`sm`}
                fw={600}
                onClick={toggle}
                c={`#000000A6`}
                bg={`none`}
                underline='never'
                pb={12}
              >
                공지사항
              </Anchor>
              <Anchor
                href={'/drink'}
                component={Link}
                size={`sm`}
                fw={600}
                onClick={toggle}
                c={`#000000A6`}
                bg={`none`}
                underline='never'
                p={12}
              >
                이벤트
              </Anchor>
            </Flex>
          </Flex>
        </Flex>
      </Collapse>
    </Box>
  );
};

export default HeaderNavWrapper;
