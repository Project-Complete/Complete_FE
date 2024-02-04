'use client';
import { Flex, Grid } from '@mantine/core';
import Image from 'next/image';
import bookmark from '@/assets/bookmark.svg';
import heart from '@/assets/heart.svg';
import emptyStar from '@/assets/emptyStar.svg';
import StarScore from '@/components/animation/StarScore';
import classes from './MainReviewContent.module.css';

const MainReviewContent = () => {
  return (
    <Grid w={'100%'} gutter={24}>
      {new Array(10).fill(null).map((v, index) => {
        return (
          <Grid.Col
            w={'100%'}
            key={index}
            span={{ base: 6, md: 4, lg: 3 }}
            style={{ display: 'flex', justifyContent: 'center' }}
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
                  src={'https://picsum.photos/288/288.webp'}
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
                    제조사
                  </Flex>
                  <Flex gap={16}>
                    <Image
                      src={bookmark}
                      width={32}
                      height={32}
                      alt={'bookmark'}
                    />
                    <Image src={heart} width={32} height={32} alt={'heart'} />
                  </Flex>
                </Flex>
                <Flex className={classes['review-content-product-title']}>
                  주종명
                </Flex>
                <StarScore score={3.7} />
              </Flex>
            </Flex>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
export default MainReviewContent;
