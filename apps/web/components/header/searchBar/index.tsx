'use client';
import { Anchor, Autocomplete, Box, Center, Flex } from '@mantine/core';
import classes from './SearchBar.module.scss';
import HeaderWriteButton from './WriteButton';
import Image from 'next/image';
import Link from 'next/link';
import MainLogo from '../MainLogo';

const HeaderCenterWrapper = () => {
  const SearchIcon = (
    <Image
      src='/icons/돋보기.svg'
      alt='검색 아이콘'
      width={24}
      height={24}
      sizes='24px'
    />
  );
  return (
    <Center w={`100%`} h={`100%`}>
      <Flex
        maw={`1224px`}
        justify={`space-between`}
        align={`center`}
        w={`100%`}
        h={`100%`}
      >
        <Flex w={`11.5rem`} h={`5rem`} justify={'center'} align={'center'}>
          <MainLogo />
        </Flex>

        <Box
          h={`3.25rem`}
          w={`35rem`}
          px={`1rem`}
          py={`0.625rem`}
          bg={`#ffffff`}
          className={classes[`SearchBar-Wrapper`]}
        >
          <Flex w={`100%`} h={`100%`} align={`center`}>
            <Flex mr={`0.5rem`} w={`100%`} h={`100%`} align={`center`}>
              {/* 추후 맨틴의 autocomplete로 교체 -> 자동완성 기능 */}
              <Autocomplete
                leftSection={SearchIcon}
                w={`100%`}
                placeholder='원하시는 술 정보를 검색해보세요.'
                variant='unstyled'
              />
            </Flex>
          </Flex>
        </Box>

        <Flex h={'100%'} align={'center'}>
          <Anchor
            href={'/login'}
            component={Link}
            className={classes['header-nav-sns-login-button']}
          >
            <Box className={classes['header-nav-sns-login-button-inside-div']}>
              소셜 로그인
            </Box>
          </Anchor>
          <HeaderWriteButton />
        </Flex>
      </Flex>
    </Center>
  );
};

export default HeaderCenterWrapper;

// component='a'
//             href='/login'
//             w={`7rem`}
//             h={`2.75rem`}
//             radius={`1.5rem`}
//             px={`1.5rem`}
//             color={`#BCC0C4`}
//             mr={`1.5rem`}
