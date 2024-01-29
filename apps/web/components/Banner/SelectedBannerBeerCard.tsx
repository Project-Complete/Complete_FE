import { Flex, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import classes from './SelectedBannerBeerCard.module.css';
import { BannerDrinkItem, PourAnimation } from './SelectedBanner';

interface SelectedBannerBeerCardProps {
  drink: BannerDrinkItem;
  onClick: (idx: number) => void;
  isSelectComplete: boolean;
  idx: number;
}

const SelectedBannerBeerCard = ({
  drink,
  onClick,
  isSelectComplete,
  idx,
}: SelectedBannerBeerCardProps) => {
  return (
    <Flex className={classes['banner-beer-list-card-section']} align={'end'}>
      <Flex
        className={classes['banner-beer-list-background-section']}
        justify={'center'}
        align={'end'}
        onClick={() => onClick(idx + 1)}
      >
        <PourAnimation
          isSelectComplete={isSelectComplete}
          style={{ display: 'flex' }}
        >
          <Image src={'/beer.svg'} alt={'beer'} width={80} height={116} />
        </PourAnimation>
      </Flex>
      <PourAnimation
        isSelectComplete={isSelectComplete}
        style={{ position: 'absolute', right: 0, bottom: 0 }}
      >
        <Flex
          bg={'white'}
          className={classes['banner-beer-list-score-section']}
          px={4.5}
          gap={4}
          align={'center'}
        >
          <Text span lh={'30px'} size={'15px'} fw={500}>
            {drink.rate}
          </Text>
          <Image src={'/full_star.svg'} alt={'beer'} width={16} height={16} />
        </Flex>
      </PourAnimation>
    </Flex>
  );
};

export default SelectedBannerBeerCard;
