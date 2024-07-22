'use client';

import {
  Box,
  Flex,
  Menu,
  MenuDropdown,
  MenuTarget,
  TextInput,
  UnstyledButton,
  em,
} from '@mantine/core';
import { useIntersection, useMediaQuery } from '@mantine/hooks';
import { ChipButton } from '@team-complete/complete-ui';
import { usePathname, useRouter } from 'next/navigation';
import classes from './List.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDrinkListQuery } from '@/hooks/queries/useDrinkListQuery';
import { useQueryClient } from '@tanstack/react-query';

const BlenderListSearchWrapper = () => {
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width:${em(768)})`);
  const [search, setSearch] = useState<string>(``);
  const { data, hasNextPage, fetchNextPage } = useDrinkListQuery({
    drinkType: 'all',
    keyword: search,
  });
  console.log('검색 결과 , ', data);
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.3,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [`drinkList`, `all`] });
  }, [search]);

  useEffect(() => {
    if (entry && entry.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);
  return (
    <Box>
      {isMobile ? (
        <></>
      ) : (
        <Menu>
          <MenuTarget>
            <ChipButton className={classes.chipButton} variant={`primary`}>
              원하는 주류로 검색하기
            </ChipButton>
          </MenuTarget>
          <MenuDropdown>
            <Flex>
              <TextInput
                value={search}
                onChange={e => setSearch(e.target.value)}
              ></TextInput>
              <UnstyledButton>검색</UnstyledButton>
            </Flex>
            <Menu.Divider />
            <div ref={ref}></div>
          </MenuDropdown>
        </Menu>
      )}
    </Box>
  );
};

export default BlenderListSearchWrapper;
