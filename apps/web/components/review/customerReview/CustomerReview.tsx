'use client';
import StarScore from '@/components/animation/StarScore';
import { useReviewListQuery } from '@/hooks/queries/useReviewQuery';
import { Divider, Flex, Grid, Paper, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import CustomerReviewCard from './ReviewCard';
import classes from './ReviewCard.module.scss';

const CustomerReview = ({
  customerReviewRef,
  detailId,
}: {
  customerReviewRef: React.RefObject<HTMLHeadingElement> | null;
  detailId: number;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewId, setReviewId] = useState<number>(0);

  const modalHandler = (id: number) => {
    setModalOpen(prev => !prev);
    setReviewId(id);
  };
  const { data, fetchNextPage, hasNextPage } = useReviewListQuery({
    detailId,
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
    <Flex direction={'column'} w={'100%'}>
      {reviewId > 0 && (
        <CustomerReviewCard
          modalOpen={modalOpen}
          modalHandler={() => modalHandler(0)}
          reviewId={reviewId}
        />
      )}
      <Flex justify={'space-between'} align={'center'}>
        <Text
          component='h1'
          lh={'40px'}
          // fz={'28px'}
          fz={'1.125rem'}
          fw={800}
          ref={customerReviewRef}
        >
          칠러들의 솔직한 리뷰
        </Text>
        {data && data.pages[0] && data.pages[0].page_info && (
          <Text
            fz={'0.875rem'}
            lh={'1.25rem'}
            fw={400}
            c={'rgba(0, 0, 0, 0.45)'}
          >
            {data.pages[0].page_info.total_elements}개의 리뷰
          </Text>
        )}
      </Flex>

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
                        <Flex
                          pos={'absolute'}
                          right={10}
                          bottom={0}
                          w={72}
                          h={72}
                          p={10}
                          bg={'white'}
                          style={{
                            boxshadow: '0px 4px 20px 0px #00000033',
                            transform: 'translate(0, 50%)',
                            borderRadius: '100%',
                          }}
                        >
                          <Flex
                            w={'100%'}
                            h={'100%'}
                            bg={'gray'}
                            style={{ borderRadius: '100%' }}
                          ></Flex>
                        </Flex>
                      </Flex>
                      <Flex gap={10}>
                        <Text>{e.writer.nickname}</Text>
                        <Divider orientation='vertical' />
                        <Text>{e.created_date}</Text>
                      </Flex>
                      <StarScore score={e.review_rating} />
                    </Flex>
                  </Grid.Col>
                );
              })}
            </Fragment>
          ))}
      </Grid>
      <div ref={ref}></div>
    </Flex>
  );
};
export default CustomerReview;
