'use client';

import { Flex, Text, Title, Box, Rating } from '@mantine/core';
import { Chip } from '@team-complete/complete-ui';
import Image from 'next/image';
import classes from './SelectedBanner.module.css';
import selectedBannerCss from '@/components/drinkDetail/DetailSummary.module.scss';
import React, { useEffect, useMemo, useState } from 'react';
import SelectedBannerBeerCard from './SelectedBannerBeerCard';
import { produce } from 'immer';
import PourAnimation from './PourAnimation';

type SelectedBannerPropsType = {
  drinks: DrinkOfBanner[];
};

const situationKeyword: { [key: string]: string } = {
  adult_sum: '웃어른',
  partner_sum: '연인',
  friend_sum: '친구',
  business_sum: '비즈니스',
  alone_sum: '나 혼자',
};

const SelectedBanner = ({ drinks: propsDrinks }: SelectedBannerPropsType) => {
  const [drinks, setDrinks] = useState<DrinkOfBanner[]>([]);
  const [isSelectComplete, setIsSelectComplete] = useState(true);
  const handleCardClick = (idx: number) => {
    setIsSelectComplete(false);
    setTimeout(() => {
      setDrinks(
        produce(prev => {
          const selectedDrink = prev[0];
          const indexDrink = prev[idx];
          if (selectedDrink && indexDrink) {
            prev[0] = indexDrink;
            prev[idx] = selectedDrink;
          }
        }),
      );
      setIsSelectComplete(true);
    }, 1000);
  };

  useEffect(() => {
    setDrinks(propsDrinks);
  }, [propsDrinks]);



  const sortedSituationStatistics = useMemo(() => {
    if (drinks[0] === undefined) return [];
    const situationStatistics = drinks[0].situation_statistics;
    const situationStatisticsList = Object.keys(situationStatistics) as (keyof SituationStatistics)[]
    const sortedSituationStatistics = situationStatisticsList.sort((a, b) => {
      return situationStatistics[b] - situationStatistics[a]
    }).slice(0, 3)
    return sortedSituationStatistics;
  }, [drinks[0]])





  return (
    <Flex w={'100%'} h={'100%'} maw={1224} align={'center'} pos={'relative'}>
      <Flex w={'100%'}>
        {drinks[0] && (
          <PourAnimation isSelectComplete={isSelectComplete}>
            <Flex direction={'column'}>
              <Text size={'sm'} fw={400} lh={'20px'}>
                칠러들이 선별한 베스트 술 추천
              </Text>
              <Flex my={'12px'} gap={'8px'} direction={'column'}>
                <Title size={32} fw={800} lh={'40px'}>
                  {drinks[0].name}
                </Title>
                <Rating
                  className={classes['rating-section']}
                  value={drinks[0].review_rating}
                  fractions={2}
                  readOnly
                />
                <Text size={'md'} lh={'24px'} fw={400}>
                  {drinks[0].description}
                </Text>
              </Flex>
              <Flex direction={'column'} gap={'8px'} mb={'12px'}>
                <Text size={'18px'} fw={600} lh={'24px'}>
                  함께하면 좋은 안주
                </Text>
                <Flex gap={8}>
                  {(drinks[0].food_statistics ?? []).map(
                    (foodStatistic, idx) => (
                      <Chip
                        variant={'ghost'}
                        className={selectedBannerCss['chip-wrapper']}
                        key={foodStatistic.food_id}
                      >
                        <div className={selectedBannerCss['drink-food-image']}>
                          <Image
                            src={foodStatistic.image_url}
                            alt='음식 아이콘'
                            width={24}
                            height={24}
                          />
                          <Text size='md' lh={'32px'} fw={600}>
                            {foodStatistic.category}
                          </Text>
                        </div>
                      </Chip>
                    ),
                  )}
                </Flex>
              </Flex>
              <Flex direction={'column'} gap={'8px'}>
                <Text size={'18px'} fw={600} lh={'24px'}>
                  함께 마시면 좋은 사람
                </Text>
                <Flex gap={8}>
                  {sortedSituationStatistics.map((situationStastics, idx) => (
                    <Chip
                      variant={'ghost'}
                      className={selectedBannerCss['chip-wrapper']}
                      key={idx}
                    >
                      <div className={selectedBannerCss['drink-food-image']}>
                        <Image
                          src={`/detail_who/${situationStastics}.svg`}
                          alt='음식 아이콘'
                          width={24}
                          height={24}
                        />
                        <Text size='md' lh={'32px'} fw={600}>
                          {situationKeyword[situationStastics]}
                        </Text>
                      </div>
                    </Chip>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </PourAnimation>
        )}
      </Flex>
      <Flex w={500} align={'center'}>
        {drinks.map((drink, drinkIndex) => {
          return (
            <React.Fragment key={drinkIndex}>
              {drinkIndex === 0 && (
                <PourAnimation
                  isSelectComplete={isSelectComplete}
                  animate={[-20, 40]}
                  times={[0.2, 1]}
                >
                  <Image
                    src={'/beer.svg'}
                    alt={'beer'}
                    width={274}
                    height={388}
                  />
                </PourAnimation>
              )}
              {drinkIndex > 0 && (
                <Flex direction={'column'} gap={20}>
                  <SelectedBannerBeerCard
                    drink={drink}
                    onClick={handleCardClick}
                    isSelectComplete={isSelectComplete}
                    idx={drinkIndex - 1}
                  />
                </Flex>
              )}
            </React.Fragment>
          );
        })}
      </Flex>
    </Flex>
  );
};
export default SelectedBanner;
