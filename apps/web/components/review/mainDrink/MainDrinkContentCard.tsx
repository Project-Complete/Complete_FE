import { Flex, Rating } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import classes from './MainDrinkContent.module.scss';

const MainDrinkCard = ({ drinkInfo }: { drinkInfo: DrinkListElement }) => {
    return (
        <Link
            href={`/drink/${drinkInfo.drink_id}`}
            className={classes['main-review-content-link-area']}
        >
            <Flex
                direction={'column'}
                justify={'center'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                gap={16}
                pos={'relative'}
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

                <Flex w={'100%'} direction={'column'} p={10}>
                    <Flex>
                        <Flex className={classes['review-content-maker-title']}>
                            {drinkInfo.manufacturer_name}
                        </Flex>
                        <Flex gap={16}>
                            <Image
                                src={
                                    drinkInfo.drink_like
                                        ? '/icons/like_fill.svg'
                                        : '/icons/like.svg'
                                }
                                width={32}
                                height={32}
                                alt={'heart'}
                            />
                        </Flex>
                    </Flex>
                    <Flex className={classes['review-content-product-title']}>
                        {drinkInfo.drink_name}
                    </Flex>
                    <Rating value={drinkInfo.review_rating} fractions={2} readOnly />
                </Flex>
            </Flex>
        </Link>
    );
};

export default MainDrinkCard;