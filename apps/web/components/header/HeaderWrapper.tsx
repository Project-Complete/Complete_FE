'use client';

import classes from './HeaderWrapper.module.css';
import { Anchor, Box, Burger, Button, Divider, Drawer, Flex, UnstyledButton } from '@mantine/core';
import HeaderNavWrapper from './nav';
import HeaderCenterWrapper from './searchBar';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { NAVIGATION_LIST } from '@/constants/navigation';
import Link from 'next/link';
import React from 'react';

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

  return (
    <>
      {isMobile ? <Box pos={'sticky'} top={0} style={{ zIndex: 20000 }} bg={'white'}>
        <Drawer opened={opened} onClose={close} size={260} overlayProps={{
          backgroundOpacity: 0.65,
        }}>

          {NAVIGATION_LIST.map((nav, index) => {
            return <>
              <Flex key={index} w={152} p={12} m={12} justify={`center`} direction={'column'}>
                <Flex h={24} fz={18} fw={500} lh={'24px'} mb={4}>{nav.name}</Flex>
                {nav.menuList.map(v => {
                  return <Flex h={16} my={12} fz={16} fw={500} lh={'16px'}>{v.name}</Flex>
                })}
              </Flex>
            </>
          }).reduce<React.ReactNode[] | null>((a, b) => {
            return a === null ? [b] : [...a, <Divider />, b];
          }, null)}
        </Drawer>
        <Flex h={56} align={'center'} px={26} className={classes[`header-center`]}>
          <Flex w={'100%'} h={'100%'} align={'center'} gap={12}>
            <Burger opened={opened} onClick={toggle} size={24} />
            <Link href='/' style={{ height: '24px' }}>
              <Image src={'/logo/심볼.svg'} alt={'symbol'} width={24} height={24} />
            </Link>
          </Flex>
          <Link href='/search' style={{
            height: '24px',
          }}>
            <Image src={"/icons/돋보기.svg"} alt={'search'} width={24} height={24} />
          </Link>
        </Flex>
      </Box> :
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
      }
    </>
  );
};

export default HeaderWrapper;
