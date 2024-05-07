'use client';

import { useDrinksLikeListQuery } from '@/hooks/queries/useDrinksLikeListQuery';
import { MyUserInfo } from '@/types/userInfo';
import { Divider, Flex, Grid, Rating, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';
import classes from './center.module.scss';

const MyPageDrinkList = ({ myInfoData }: { myInfoData: MyUserInfo }) => {
  const { data, fetchNextPage, hasNextPage } = useDrinksLikeListQuery({
    size: 9,
  });

  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.3,
  });
  useEffect(() => {
    if (entry && entry.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);

  return (
    <>
      <Grid w={'100%'} gutter={24} mt={24} mb={24}>
        {data &&
          data.pages &&
          data.pages.map((v, index) => (
            <Fragment key={index}>
              {v.drinks.map(e => {
                return (
                  <Grid.Col
                    key={e.drink_id}
                    w={'100%'}
                    span={{ base: 6, sm: 4 }}
                    className={classes['review-grid-col']}
                  >
                    <Flex gap={16} direction={'column'}>
                      <Flex
                        w={'100%'}
                        pb={'73.4%'}
                        pos={'relative'}
                        style={{
                          boxShadow: '0px 4px 20px 0px #00000033',
                          borderRadius: '12px',
                        }}
                      >
                        <Image
                          src={
                            e.image_url !== 'string' &&
                            e.image_url !== '' &&
                            e.image_url !== 'imageUrl'
                              ? e.image_url
                              : 'https://picsum.photos/392/288.webp'
                          }
                          sizes='512px'
                          fill
                          style={{
                            objectFit: 'contain',
                            borderRadius: '12px',
                          }}
                          alt={'image'}
                        />
                      </Flex>
                      <Flex gap={10}>
                        <Text>{e.drink_name}</Text>
                        <Divider orientation='vertical' />
                        <Text>{e.manufacturer_name}</Text>
                      </Flex>
                      <Rating value={e.review_rating} fractions={2} readOnly />
                    </Flex>
                  </Grid.Col>
                );
              })}
            </Fragment>
          ))}
      </Grid>
      <div ref={ref}></div>
    </>
  );
};

export default MyPageDrinkList;
