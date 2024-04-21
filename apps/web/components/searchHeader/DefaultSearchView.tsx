'use client';
import { Flex, Pill, Text } from '@mantine/core';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { DRINKS_TYPE } from '@/constants/drinks';
const DefaultSearchView: React.FC = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([
    '검색어',
    '검색어',
    '검색어',
    '검색어',
  ]);

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
            {recentSearches.map((search, index) => {
              return (
                <Pill key={index} withRemoveButton>
                  {search}
                </Pill>
              );
            })}
          </Pill.Group>
        </Flex>
        <Flex direction={'column'} w={'100%'}>
          <Text c={'h2'}>인기 검색어</Text>
          <Pill.Group>
            {popularSearches.map((search, index) => (
              <Pill key={index}>{search}</Pill>
            ))}
          </Pill.Group>
        </Flex>
      </Flex>
      <Flex direction={'column'}>
        <Text c={'h2'}>주종별로 찾아볼까요?</Text>
        <Flex>
          {drinksType.map(({ label, exposeLabel, image }, index) => {
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
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DefaultSearchView;
