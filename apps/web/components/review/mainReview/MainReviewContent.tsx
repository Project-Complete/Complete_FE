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
    <Flex w={'100%'}>
      <Grid className='asdfqwer' gutter={24}>
        {new Array(10).fill(null).map((v, index) => {
          return (
            <Grid.Col
              key={index}
              span={{ base: 6, md: 4, lg: 3 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Flex
                direction={'column'}
                w={288}
                justify={'center'}
                align={'center'}
                style={{
                  overflow: 'hidden',
                  border: '1px solid black',
                  borderRadius: '12px',
                }}
                gap={16}
              >
                <Flex
                  w={{ base: 288, sm: 288 }}
                  h={{ base: 288, sm: 288 }}
                  style={{
                    border: '1px solid black',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={'https://picsum.photos/288/288.webp'}
                    width={288}
                    height={288}
                    alt={'image'}
                  />
                </Flex>
                <Flex direction={'column'} p={10}>
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
    </Flex>
  );
};
export default MainReviewContent;
