'use client';

import { Flex, Text, Title, Box, Rating } from '@mantine/core';
import Image from 'next/image';
import classes from './SelectedBanner.module.css';
import React, { useEffect, useState } from 'react';
import SelectedBannerBeerCard from './SelectedBannerBeerCard';
import { produce } from 'immer';
import PourAnimation from './PourAnimation';

type SelectedBannerPropsType = {
  drinks: DrinkOfBanner[];
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

  return (
    <Flex w={'100%'} h={'100%'} maw={1224} align={'center'} pos={'relative'}>
      <Flex w={'100%'}>
        {drinks[0] && (
          <PourAnimation isSelectComplete={isSelectComplete}>
            <Flex direction={'column'}>
              <Text size={'lg'} fw={500} lh={'50px'}>
                칠러들이 선별한 베스트 술 추천
              </Text>
              <Title size={40} fw={800} lh={'60px'}>
                {drinks[0].name}
              </Title>
              <Rating
                className={classes['rating-section']}
                value={drinks[0].review_rating}
                fractions={2}
                readOnly
              />
              <Text lh={'32px'} my={'12px'} fw={500}>
                {drinks[0].description}
              </Text>
              <Text size={'lg'} fw={600} lh={'40px'}>
                함께하면 좋은 안주
              </Text>
              <Flex gap={24}>
                {(drinks[0].food_statistics ?? []).map((foodStatistic, idx) => (
                  <div
                    key={idx}
                    className={classes['banner-food-image-section']}
                  >
                    <Image
                      src={foodStatistic.image_url}
                      height={72}
                      width={72}
                      alt={foodStatistic.category}
                    />
                    <div className={classes['category-text']}>
                      {foodStatistic.category}
                    </div>
                  </div>
                ))}
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
