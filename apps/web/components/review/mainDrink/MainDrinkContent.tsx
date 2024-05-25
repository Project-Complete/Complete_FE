'use client';
import { Flex, Grid, Rating } from '@mantine/core';
import Image from 'next/image';
import bookmark from '@/assets/bookmark.svg';
import heart from '@/assets/heart.svg';
import emptyStar from '@/assets/emptyStar.svg';
import { useMainDrinkListQuery } from '@/hooks/queries/useDrinkListQuery';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { useMemo } from 'react';
import React from 'react';
import { Carousel } from '@mantine/carousel';
import MainDrinkCard from './MainDrinkContentCard';


const MainDrinkContent = ({
  drinkType,
}: {
  drinkType: 'all' | 'beer' | 'tradition';
}) => {
  const { data } = useMainDrinkListQuery({
    drinkType: drinkType,
  });
  const matches = useMediaQuery('(max-width: 56.25em)');

  const drinkInfos = data?.drinks ?? [];

  const MobileContent = () => {
    return <Carousel w={'100%'} slideSize={320} dragFree slideGap={50} >
      {drinkInfos.map((v, index) => {
        return (
          <Carousel.Slide >
            <MainDrinkCard key={index} drinkInfo={v} />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  }

  const NormalContent = () => {
    return <Grid w={'100%'} gutter={24} >
      {drinkInfos.map((v, index) => {
        return (
          <Grid.Col
            key={index}
            w={'100%'}
            span={{ base: 6, md: 4, lg: 3 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <MainDrinkCard drinkInfo={v} />
          </Grid.Col>
        );
      })}
    </Grid>
  }
  return matches ? <MobileContent /> : <NormalContent />
};
export default React.memo(MainDrinkContent);
