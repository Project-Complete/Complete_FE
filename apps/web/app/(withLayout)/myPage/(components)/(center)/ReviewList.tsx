'use client';

import { useReviewListQuery } from '@/hooks/queries/useReviewQuery';
import { MyUserInfo } from '@/types/userInfo';
import { Divider, Flex, Grid, Rating, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';
import classes from './center.module.scss';

const MyPageCenterReviewList = ({ myInfoData }: { myInfoData: MyUserInfo }) => {
  const { data, fetchNextPage, hasNextPage } = useReviewListQuery({
    writerId: myInfoData.user_id,
    sort: 'latest',
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
  console.log(data);
  return (
    <>
      <Grid w={'100%'} gutter={24} mt={24} mb={24}>
        {data &&
          data.pages &&
          data.pages.map((v, index) => (
            <Fragment key={index}>
              {v.reviews.map(e => {
                return (
                  <Grid.Col
                    key={e.id}
                    w={'100%'}
                    span={{ base: 6, sm: 4 }}
                    //   onClick={() => {
                    //     modalHandler(e.id);
                    //   }}
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
                            e.image_url !== 'string' && e.image_url !== ''
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
                        <Text>{e.writer.nickname}</Text>
                        <Divider orientation='vertical' />
                        <Text>{e.created_date}</Text>
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

export default MyPageCenterReviewList;
