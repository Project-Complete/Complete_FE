'use client';

import { useBlenderListQuery } from '@/hooks/queries/blenders/useBlenderListQuery';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Rating,
  Text,
  UnstyledButton,
  em,
} from '@mantine/core';
import { useIntersection, useMediaQuery } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import { Fragment, SetStateAction, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import classes from './List.module.scss';
import LikeButton from '@/components/button/LikeButton';
import { Dropdown } from '@team-complete/complete-ui';
import { useQueryClient } from '@tanstack/react-query';

const BlenderList = ({ drinkId }: { drinkId: number | undefined }) => {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<string | null>(`최신 순`);
  const isMobile = useMediaQuery(`(max-width:${em(768)})`);

  let page = searchParams?.get('page');
  if (!page) {
    page = '1';
  }
  const { data, fetchNextPage, hasNextPage } = useBlenderListQuery({
    page: parseInt(page),
    sorted: filter === '최신 순' || filter === null ? `latest` : `popularity`,
    drinkId: drinkId ? drinkId.toString() : null,
  });
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.3,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (filter === `최신 순` || filter === null) {
      queryClient.invalidateQueries({
        queryKey: [`blender`, `page`, page, `sorted`, 'latest'],
      });
    } else if (filter === `인기 순`) {
      queryClient.invalidateQueries({
        queryKey: [`blender`, `page`, page, `sorted`, `popularity`],
      });
    }
  }, [filter]);
  useEffect(() => {
    if (entry && entry.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);

  if (data) {
    return (
      <>
        <Flex h={`2.5rem`} justify={`space-between`} mt={`0.75rem`}>
          <Text
            c={`rgba(0, 0, 0, 0.45))`}
            fz={`0.875rem`}
            fw={400}
            lh={`1.25rem`}
            mt={12}
          >
            {data && data.pages[0] && data.pages[0].page_info.total_elements}
            개의 글
          </Text>
          <Dropdown
            placeholder='정렬'
            className={classes.select}
            data={['최신 순', `인기 순`]}
            value={filter}
            onChange={(value: SetStateAction<string | null>) =>
              setFilter(value)
            }
          ></Dropdown>
        </Flex>
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
                    <Box mb={16}>게시글이 없어요!</Box>
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
                        >
                          <Flex
                            gap={8}
                            direction={'column'}
                            miw={isMobile ? '' : `18rem`}
                          >
                            <Flex
                              miw={isMobile ? '' : `18rem`}
                              mah={isMobile ? '' : `18rem`}
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
                                    e.combination_image_url !== 'string' &&
                                    e.combination_image_url !== '' &&
                                    e.combination_image_url !== 'imageUrl' &&
                                    e.combination_image_url !== '테스트 url'
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
                              </Link>
                            </Flex>
                            <Flex w={'100%'} direction={'column'}>
                              <Flex>
                                <Flex direction='column'>
                                  <Flex
                                    className={
                                      classes['drink-content-maker-title']
                                    }
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
                  </>
                )}
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
