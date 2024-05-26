'use client';

import { useBlenderListQuery } from '@/hooks/queries/blenders/useBlenderListQuery';
import {
  Avatar,
  Flex,
  Grid,
  Rating,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import { Fragment, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import classes from './List.module.scss';
import LikeButton from '@/components/button/LikeButton';

const BlenderList = () => {
  const searchParams = useSearchParams();
  let page = searchParams?.get('page');
  if (!page) {
    page = '1';
  }
  const { data, fetchNextPage, hasNextPage } = useBlenderListQuery({
    page: parseInt(page),
    sorted: 'latest',
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

  if (data) {
    return (
      <>
        <Grid w={'100%'} gutter={24} mt={24} mb={24}>
          {data &&
            data.pages &&
            data.pages.map((v, index) => (
              <Fragment key={index}>
                {v.combinations.map(e => {
                  return (
                    <Grid.Col
                      key={e.combination_board_id}
                      w={'100%'}
                      span={{ base: 6, sm: 4 }}
                    >
                      <Flex gap={8} direction={'column'} miw={`18rem`}>
                        <Flex
                          miw={`18rem`}
                          mah={`18rem`}
                          w={'100%'}
                          pb={'73.4%'}
                          pos={'relative'}
                          style={{
                            boxShadow: '0px 4px 20px 0px #00000033',
                            borderRadius: '12px',
                          }}
                        >
                          <Link
                            href={`/drink/blender/${e.combination_board_id}`}
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
                          </Link>
                        </Flex>
                        <Flex w={'100%'} direction={'column'}>
                          <Flex>
                            <Flex direction='column'>
                              <Flex
                                className={classes['drink-content-maker-title']}
                              >
                                <UnstyledButton
                                  component='a'
                                  href={`/drink/blender/${e.combination_board_id}`}
                                >
                                  <Text fz={`1rem`} fw={500} lh={`1.5rem`}>
                                    {e.title}
                                  </Text>
                                </UnstyledButton>
                              </Flex>
                              <Flex align={'center'}>
                                <Avatar radius={`xl`} size={'xs'} mr={4} />
                                <UnstyledButton
                                  component='a'
                                  href={`/drink/blender/${e.combination_board_id}`}
                                >
                                  <Text
                                    c={`var(--font-card-list-lable, rgba(0, 0, 0, 0.45))`}
                                    fz={`0.875rem`}
                                    fw={400}
                                    lh={`1rem`}
                                  >
                                    {e.nickname}
                                  </Text>
                                </UnstyledButton>
                              </Flex>
                            </Flex>
                            <Flex ml={'auto'} align={'center'}>
                              {/* <LikeButton
                                    drink_like={e.combination_like}
                                    drink_id={e.combination_board_id}
                                    isMyPage={true}
                                  /> */}
                            </Flex>
                          </Flex>
                        </Flex>
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
  } else {
    return null;
  }
};

export default BlenderList;
