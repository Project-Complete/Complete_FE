'use client';
import { Flex, Grid, Rating } from '@mantine/core';
import Image from 'next/image';
import bookmark from '@/assets/bookmark.svg';
import heart from '@/assets/heart.svg';
import emptyStar from '@/assets/emptyStar.svg';
import classes from './MainDrinkContent.module.css';
import { useMainDrinkListQuery } from '@/hooks/queries/useDrinkListQuery';
import Link from 'next/link';

const MainDrinkContent = ({
  drinkType,
}: {
  drinkType: 'all' | 'beer' | 'tradition';
}) => {
  const { data } = useMainDrinkListQuery({
    drinkType: drinkType,
  });
  console.log(data);
  return (
    <Grid w={'100%'} gutter={24}>
      {data &&
        data.drinks &&
        data.drinks.map(v => {
          return (
            <Grid.Col
              w={'100%'}
              key={v.drink_id}
              span={{ base: 6, md: 4, lg: 3 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Link
                href={`/drink/${v.drink_id}`}
                className={classes['main-review-content-link-area']}
              >
                <Flex
                  direction={'column'}
                  justify={'center'}
                  align={'center'}
                  w={'100%'}
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
                        v.image_url === 'imageUrl'
                          ? `https://picsum.photos/392/288.webp`
                          : v.image_url
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
                        {v.manufacturer_name}
                      </Flex>
                      <Flex gap={16}>
                        <Image
                          src={
                            v.drink_like
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
                      {v.drink_name}
                    </Flex>
                    <Rating value={v.review_rating} fractions={2} readOnly />
                  </Flex>
                </Flex>
              </Link>
            </Grid.Col>
          );
        })}
    </Grid>
  );
};
export default MainDrinkContent;
