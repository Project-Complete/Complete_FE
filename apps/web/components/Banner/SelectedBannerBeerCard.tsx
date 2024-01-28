import { Flex, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import classes from './SelectedBannerBeerCard.module.css';

const SelectedBannerBeerCard = () => {
  return (
    <Flex className={classes['banner-beer-list-card-section']} align={'end'}>
      <Flex
        className={classes['banner-beer-list-background-section']}
        justify={'center'}
        align={'end'}
      >
        <Image src={'/beer.svg'} alt={'beer'} width={80} height={116} />
      </Flex>
      <Flex
        bg={'white'}
        className={classes['banner-beer-list-score-section']}
        px={4.5}
        gap={4}
        align={'center'}
      >
        <Text span lh={'30px'} size={'15px'} fw={500}>
          4.5
        </Text>
        <Image src={'/full_star.svg'} alt={'beer'} width={16} height={16} />
      </Flex>
    </Flex>
  );
};

export default SelectedBannerBeerCard;
