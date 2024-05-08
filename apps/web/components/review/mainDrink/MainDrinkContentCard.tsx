import { Flex, Rating, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import classes from './MainDrinkContent.module.scss';
import LikeButton from '@/components/button/LikeButton';

const MainDrinkCard = ({ drinkInfo }: { drinkInfo: DrinkListElement }) => {
  return (
    <Flex
      direction={'column'}
      justify={'center'}
      align={'center'}
      w={'100%'}
      h={'100%'}
      gap={16}
      pos={'relative'}
    >
      <Link
        href={`/drink/${drinkInfo.drink_id}`}
        className={classes['main-review-content-link-area']}
      >
        <Flex
          w={'100%'}
          pb={'100%'}
          style={{
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: '0px 4px 20px 0px #00000033',
          }}
          pos={'relative'}
        >
          <Image
            src={
              drinkInfo.image_url === 'imageUrl'
                ? `https://picsum.photos/392/288.webp`
                : drinkInfo.image_url
            }
            sizes='256px'
            fill
            style={{
              objectFit: 'contain',
            }}
            alt={'image'}
          />
        </Flex>
      </Link>

      <Flex w={'100%'} direction={'column'} p={10}>
        <Flex>
          <Flex direction='column'>
            <Flex className={classes['review-content-maker-title']}>
              <UnstyledButton
                component='a'
                href={`/drink/${drinkInfo.drink_id}`}
              >
                {drinkInfo.manufacturer_name}
              </UnstyledButton>
            </Flex>
            <Flex className={classes['review-content-product-title']}>
              <UnstyledButton
                component='a'
                href={`/drink/${drinkInfo.drink_id}`}
              >
                {drinkInfo.drink_name}
              </UnstyledButton>
            </Flex>
          </Flex>
          <Flex ml={'auto'}>
            <LikeButton
              drink_id={drinkInfo.drink_id}
              drink_like={drinkInfo.drink_like}
              isMyPage={true}
            />
          </Flex>
        </Flex>
        <Rating value={drinkInfo.review_rating} fractions={2} readOnly />
      </Flex>
    </Flex>
  );
};

export default MainDrinkCard;
