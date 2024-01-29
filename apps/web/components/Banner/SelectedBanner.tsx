'use client';

import { Anchor, Flex, Text, Title, useStyles, Box } from '@mantine/core';
import Image from 'next/image';
import classes from './SelectedBanner.module.css';
import { MotionStyle, motion } from 'framer-motion';
import React, { useState } from 'react';
import SelectedBannerBeerCard from './SelectedBannerBeerCard';

const drinkDummy: BannerDrinkItem[] = [
  {
    id: 1,
    name: '독일 트롤브루 레몬 라들러1',
    description:
      '트롤브루 레몬은 유럽식 레몬 라들러 스타일을 기반으로 자연원료를 사용해 양조한 과일 맥주입니다.\n 레몬, 오렌지 등 천연과일 추출물을 포함한 과일쥬스와 라거 맥주를 6:4 비율로 배합하여,\n 상큼한 과일의 향미와 시원한 맥주의 청량감을 조화롭게 구현해 낸 독일산 수입 맥주입니다.',
    image_url: '/beer.svg',
    food: ['과일', '치즈', '초콜릿', '파스타'],
    rate: 3.3,
  },
  {
    id: 2,
    name: '독일 트롤브루 레몬 라들러2',
    description:
      '트롤브루 레몬은 유럽식 레몬 라들러 스타일을 기반으로 자연원료를 사용해 양조한 과일 맥주입니다.\n 레몬, 오렌지 등 천연과일 추출물을 포함한 과일쥬스와 라거 맥주를 6:4 비율로 배합하여,\n 상큼한 과일의 향미와 시원한 맥주의 청량감을 조화롭게 구현해 낸 독일산 수입 맥주입니다.',
    image_url: '/beer.svg',
    food: ['과일', '치즈', '초콜릿', '파스타'],
    rate: 3.6,
  },
  {
    id: 3,
    name: '독일 트롤브루 레몬 라들러3',
    description:
      '트롤브루 레몬은 유럽식 레몬 라들러 스타일을 기반으로 자연원료를 사용해 양조한 과일 맥주입니다.\n 레몬, 오렌지 등 천연과일 추출물을 포함한 과일쥬스와 라거 맥주를 6:4 비율로 배합하여,\n 상큼한 과일의 향미와 시원한 맥주의 청량감을 조화롭게 구현해 낸 독일산 수입 맥주입니다.',
    image_url: '/beer.svg',
    food: ['과일', '치즈', '초콜릿', '파스타'],
    rate: 3.8,
  },
  {
    id: 4,
    name: '독일 트롤브루 레몬 라들러4',
    description:
      '트롤브루 레몬은 유럽식 레몬 라들러 스타일을 기반으로 자연원료를 사용해 양조한 과일 맥주입니다.\n 레몬, 오렌지 등 천연과일 추출물을 포함한 과일쥬스와 라거 맥주를 6:4 비율로 배합하여,\n 상큼한 과일의 향미와 시원한 맥주의 청량감을 조화롭게 구현해 낸 독일산 수입 맥주입니다.',
    image_url: '/beer.svg',
    food: ['과일', '치즈', '초콜릿', '파스타'],
    rate: 4.5,
  },
];

export interface BannerDrinkItem {
  id: number;
  name: string;
  description: string;
  image_url: string;
  food: string[];
  rate: number;
}

type PourAnimationPropsType = {
  children: React.ReactNode;
  isSelectComplete: boolean;
  animate?: number | number[];
  times?: number[];
  style?: MotionStyle;
};

export const PourAnimation = ({
  children,
  isSelectComplete,
  animate = 40,
  times,
  style,
}: PourAnimationPropsType) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{
        y: isSelectComplete ? 0 : animate,
        opacity: isSelectComplete ? 1 : 0,
      }}
      transition={{ duration: 1, times: times }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

const SelectedBanner = () => {
  const [drinks, setDrinks] = useState(drinkDummy);
  const [isSelectComplete, setIsSelectComplete] = useState(true);

  const handleCardClick = (idx: number) => {
    setIsSelectComplete(false);

    setTimeout(() => {
      const newDrinks = [...drinks];
      const selectedDrink = drinks[0] as BannerDrinkItem;
      newDrinks[0] = newDrinks[idx] as BannerDrinkItem;
      newDrinks[idx] = selectedDrink;

      setDrinks(newDrinks);
      setIsSelectComplete(true);
    }, 1000);
  };

  return (
    <Flex w={'100%'} h={'100%'} maw={1224} align={'center'}>
      <PourAnimation isSelectComplete={isSelectComplete}>
        <Flex direction={'column'}>
          <Text size={'lg'} fw={500} lh={'50px'}>
            칠러들이 선별한 베스트 술 추천
          </Text>
          <Title size={40} fw={800} lh={'60px'}>
            {drinks[0]?.name}
          </Title>
          <Text size={'lg'} lh={'50px'} fw={500}>
            3,700원 / 500ml
          </Text>
          <Text lh={'32px'} my={'12px'} fw={500}>
            {drinks[0]?.description}
          </Text>
          <Text size={'lg'} fw={600} lh={'40px'}>
            함께하면 좋은 안주
          </Text>
          <Flex gap={24}>
            {/* TODO: 추후 음식 이미지로 변경 필요 */}
            {drinks[0]?.food.map((item, idx) => (
              <div
                key={idx}
                className={classes['banner-food-image-section']}
              ></div>
            ))}
          </Flex>
        </Flex>
      </PourAnimation>
      <PourAnimation
        isSelectComplete={isSelectComplete}
        animate={[-20, 40]}
        times={[0.2, 1]}
      >
        <Box ml={24} mr={92} bg={'orange'}>
          <Image
            src={drinks[0]?.image_url || '/beer.svg'}
            alt={'beer'}
            width={274}
            height={388}
          />
          {drinks[0]?.name}
        </Box>
      </PourAnimation>
      <Flex direction={'column'} gap={20}>
        {drinks.slice(1).map((drink, idx) => (
          <SelectedBannerBeerCard
            key={idx}
            drink={drink}
            onClick={handleCardClick}
            isSelectComplete={isSelectComplete}
            idx={idx}
          />
        ))}
      </Flex>
    </Flex>
  );
};
export default SelectedBanner;
