'use client';
import React, { useMemo } from 'react';
import { DRINKS_TYPE } from '@/constants/drinks';
import { Flex, Pill, Text } from '@mantine/core';
import Image from 'next/image';

type DefaultSearchViewPropsType = {
  recentSearches: string[];
  deleteRecentSearch: (index: number) => void;
};

const DefaultSearchView = ({
  recentSearches,
  deleteRecentSearch,
}: DefaultSearchViewPropsType) => {
  const popularSearches = ['Coffee', 'Tea', 'Juice'];

  const drinksType = useMemo(() => {
    return Object.values(DRINKS_TYPE).sort((a, b) => a.sort - b.sort);
  }, []);

  return (
    <Flex direction={'column'} w={'100%'}>
      <Flex w={'100%'}>
        <Flex direction={'column'} w={'100%'}>
          <Text c={'h2'}>최근 검색어</Text>
          <Pill.Group>
            {recentSearches.map((search: string, index: number) => {
              return (
                <Pill
                  key={index}
                  withRemoveButton
                  onRemove={() => deleteRecentSearch(index)}
                >
                  {search}
                </Pill>
              );
            })}
          </Pill.Group>
        </Flex>
        <Flex direction={'column'} w={'100%'}>
          <Text c={'h2'}>인기 검색어</Text>
          <Pill.Group>
            {popularSearches.map((search: string, index: number) => (
              <Pill key={index}>{search}</Pill>
            ))}
          </Pill.Group>
        </Flex>
      </Flex>
      <Flex direction={'column'}>
        <Text c={'h2'}>주종별로 찾아볼까요?</Text>
        <Flex>
          {drinksType.map(
            ({ label, exposeLabel, image }: any, index: number) => {
              return (
                <Flex key={index} direction={'column'} align={'center'}>
                  <Image
                    src={image}
                    width={60}
                    height={60}
                    alt={label}
                    placeholder='blur'
                    blurDataURL={image}
                  ></Image>
                  <Text>{exposeLabel}</Text>
                </Flex>
              );
            },
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DefaultSearchView;
