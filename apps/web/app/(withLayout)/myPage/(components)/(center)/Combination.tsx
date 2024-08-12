'use client';

import { useMyBlenderListQuery } from '@/hooks/queries/blenders/useBlenderListQuery';
import { Box, Flex, Grid, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { Fragment, useEffect } from 'react';
import classes from './center.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MyPageCombinationList = () => {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage } = useMyBlenderListQuery({
    page: 1,
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
              {v.page_info.total_elements === 0 ? (
                <Flex
                  mt={16}
                  w={`100%`}
                  h={`100%`}
                  justify={`center`}
                  align={`center`}
                  direction={`column`}
                >
                  <Box mb={16}>아직 작성한 게시글이 없어요!</Box>
                  <Box>
                    <Image
                      src={`/noContent.svg`}
                      alt='아무것도 없다'
                      width={288}
                      height={320}
                    />
                  </Box>
                </Flex>
              ) : (
                <>
                  {v.combinations.map(e => {
                    return (
                      <Grid.Col
                        key={e.combination_board_id}
                        w={'100%'}
                        span={{ base: 6, sm: 4 }}
                        className={classes['review-grid-col']}
                        onClick={() => {
                          router.push(
                            `/drink/blender/${e.combination_board_id}`,
                          );
                        }}
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
                                e.combination_image_url !== 'string' &&
                                e.combination_image_url !== ''
                                  ? e.combination_image_url
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
                            <Text>{e.title}</Text>
                          </Flex>
                        </Flex>
                      </Grid.Col>
                    );
                  })}
                </>
              )}
            </Fragment>
          ))}
      </Grid>
      <div ref={ref}></div>
    </>
  );
};

export default MyPageCombinationList;
