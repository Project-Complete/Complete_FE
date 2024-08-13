'use client';

import classes from './HeaderWrapper.module.css';
import {
  Anchor,
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Text,
  UnstyledButton,
} from '@mantine/core';
import HeaderNavWrapper from './nav';
import HeaderCenterWrapper from './searchBar';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { NAVIGATION_LIST } from '@/constants/navigation';
import Link from 'next/link';
import React from 'react';
import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';
import Cookies from 'js-cookie';
import HeaderWriteButton from './searchBar/WriteButton';
import { Chip } from '@team-complete/complete-ui';

type HeaderWrapperPropsType = {
  useNav?: boolean;
  isCenter?: boolean;
  isLogin?: boolean;
};

const HeaderWrapper = ({
  useNav = false,
  isCenter = false,
  isLogin = false,
}: HeaderWrapperPropsType) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const { data: myInfoData } = useMyInfoQuery(isLogin);
  return (
    <>
      {isMobile ? (
        <Box pos={'sticky'} top={0} style={{ zIndex: 20000 }} bg={'white'}>
          <Drawer
            opened={opened}
            onClose={close}
            size={260}
            overlayProps={{
              backgroundOpacity: 0.65,
            }}
            w={`100%`}
            h={`100%`}
          >
            <Flex w={`100%`} h={`100%`} direction={`column`}>
              {!isLogin ? (
                <Flex pos={`absolute`} bottom={4}>
                  <Link href={`/login`}>로그인</Link>
                </Flex>
              ) : (
                <>
                  {myInfoData && (
                    <Flex w={`100%`} py={`0.5rem`} direction='column'>
                      <Link href='/myPage' className={classes.MyInfoData}>
                        <Flex w={`100%`} align={`center`} direction={`column`}>
                          <Avatar
                            src={myInfoData.profile_image_url}
                            alt="It's me!"
                          />

                          {myInfoData.nickname}
                        </Flex>
                      </Link>

                      <Button
                        onClick={() => {
                          Cookies.remove('access_token');
                          Cookies.remove('refresh_token');

                          if (window) {
                            window.location.reload();
                          }
                        }}
                        fullWidth
                        pl={0}
                        justify={`start`}
                        h={`2.215rem`}
                        pr={`0.5rem`}
                        py={`0.31rem`}
                        bg={`none`}
                        pos={`absolute`}
                        bottom={2}
                      >
                        <Text
                          c={`#000`}
                          size='0.875rem'
                          w={`100%`}
                          h={`1.5rem`}
                        >
                          로그아웃
                        </Text>
                      </Button>
                    </Flex>
                  )}
                </>
              )}
            </Flex>
            {NAVIGATION_LIST.map((nav, index) => {
              return (
                <>
                  <Flex
                    key={index}
                    w={152}
                    p={12}
                    m={12}
                    justify={`center`}
                    direction={'column'}
                  >
                    <Flex h={24} fz={18} fw={500} lh={'24px'} mb={4}>
                      {nav.name}
                    </Flex>
                    {nav.menuList.map(v => {
                      return (
                        <Flex h={16} my={12} fz={16} fw={500} lh={'16px'}>
                          {v.name}
                        </Flex>
                      );
                    })}
                  </Flex>
                </>
              );
            }).reduce<React.ReactNode[] | null>((a, b) => {
              return a === null ? [b] : [...a, <Divider />, b];
            }, null)}
            {isLogin && (
              <Flex w={`100%`} justify={`center`}>
                <Button
                  component='a'
                  href={`/drink/blender/write`}
                  variant={'primary'}
                  w={`100%`}
                  h={`2.5rem`}
                  radius={`1.5rem`}
                  px={`1.5rem`}
                  className={classes['header-nav-write-button']}
                >
                  <Text size='14px' w={`100%`} fw={600} ta='center'>
                    주류끼리 안주끼리 글 쓰기
                  </Text>
                </Button>
              </Flex>
            )}
          </Drawer>
          <Flex
            h={56}
            align={'center'}
            px={26}
            className={classes[`header-center`]}
          >
            <Flex w={'100%'} h={'100%'} align={'center'} gap={12}>
              <Burger opened={opened} onClick={toggle} size={24} />
              <Link href='/' style={{ height: '24px' }}>
                <Image
                  src={'/logo/심볼.svg'}
                  alt={'symbol'}
                  width={24}
                  height={24}
                />
              </Link>
            </Flex>
            <Link
              href='/search'
              style={{
                height: '24px',
              }}
            >
              <Image
                src={'/icons/돋보기.svg'}
                alt={'search'}
                width={24}
                height={24}
              />
            </Link>
          </Flex>
        </Box>
      ) : (
        <>
          <Flex w={`100%`} h={120} className={classes[`header-center`]}>
            <HeaderCenterWrapper isCenter={isCenter} isLogin={isLogin} />
          </Flex>
          {!useNav && (
            <>
              <Flex
                w={`100%`}
                h={60}
                pos={`sticky`}
                top={0}
                bg={`#FFF`}
                style={{ zIndex: 10 }}
              >
                <Flex w={`100%`} h={`100%`} pos={`relative`} top={0}>
                  <HeaderNavWrapper />
                </Flex>
              </Flex>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HeaderWrapper;
