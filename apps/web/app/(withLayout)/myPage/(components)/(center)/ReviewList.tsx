'use client';

import { useReviewListQuery } from '@/hooks/queries/useReviewQuery';
import { MyUserInfo } from '@/types/userInfo';
import { Divider, Flex, Grid, Rating, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import classes from './center.module.scss';
import CustomerReviewCard from '@/components/review/customerReview/ReviewCard';

const MyPageCenterReviewList = ({ myInfoData }: { myInfoData: MyUserInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<number>(0);
  const modalHandler = (id: number) => {
    setIsModalOpen(prev => !prev);
    setReviewId(id);
  };

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

  return (
    <>
      {isModalOpen && (
        <CustomerReviewCard
          modalOpen={isModalOpen}
          modalHandler={() => modalHandler(0)}
          reviewId={reviewId}
        />
      )}
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
                    onClick={() => {
                      modalHandler(e.id);
                    }}
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
                        <Text>{e.drink.name}</Text>
                        {/* <Divider orientation='vertical' />
                        <Text>{e.created_date}</Text> */}
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
