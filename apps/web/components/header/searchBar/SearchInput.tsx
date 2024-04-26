'use client';

import { Box, Flex, Autocomplete, UnstyledButton } from '@mantine/core';
import classes from './SearchBar.module.scss';
import Image from 'next/image';
import { useState } from 'react';

const HeaderCenterSearchInput = () => {
  // 현재 포커싱 되어있는 상태
  const [isFocused, setIsFocused] = useState(false);
  // 포커싱이 되어있다면
  const handleFocus = () => {
    setIsFocused(true);
  };
  // 포커싱이 되어있지 않다면
  const handleBlur = () => {
    setIsFocused(false);
  };
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
    <Box
      component='a'
      href='/search'
      h={`3.25rem`}
      w={`35rem`}
      px={`1rem`}
      py={`0.625rem`}
      bg={`#ffffff`}
      className={
        isFocused
          ? classes[`SearchBar-focus-Wrapper`]
          : classes[`SearchBar-Wrapper`]
      }
    >
      <Flex w={`100%`} h={`100%`} align={`center`}>
        <Flex mr={`0.5rem`} w={`100%`} h={`100%`} align={`center`}>
          {/* 추후 맨틴의 autocomplete로 교체 -> 자동완성 기능 */}
          <Autocomplete
            className={classes[`searchBar-input`]}
            leftSection={SearchIcon}
            w={`100%`}
            placeholder='원하시는 술 정보를 검색해보세요.'
            variant='unstyled'
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default HeaderCenterSearchInput;
