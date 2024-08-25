'use client';
import { Anchor, Box, Flex, Text, em } from '@mantine/core';
import Link from 'next/link';
import { ChipButton } from '@team-complete/complete-ui';
import AngleRight from '@/assets/angleRight.svg';
import Image from 'next/image';
import classes from './MainDrinkHeader.module.css';
import { useMediaQuery } from '@mantine/hooks';

const MainDrinkHeader = ({
  activeState,
  activeStateHandler,
}: {
  activeState: DrinkType
  activeStateHandler: (value: 'all' | 'beer' | 'tradition') => void;
}) => {
  const isMobile = useMediaQuery(`(max-width:${em(768)})`);
  return (
    <Flex w={'100%'} direction={'column'}>
      <Flex w={'100%'} mt={'4.5rem'} className={classes['review-main-title']}>
        나의 인생 주류, 추천합니다!
      </Flex>
      <Flex w={'100%'} mb={24} direction={isMobile ? `column` : `row`}>
        <Flex
          w={'100%'}
          className={classes['review-filter-button-layout']}
          gap={16}
        >
          <ChipButton
            variant={'primary'}
            onClick={() => {
              activeStateHandler('all');
            }}
            className={
              activeState === 'all'
                ? classes['ChipButtonArea-active']
                : classes.ChipButtonArea
            }
          >
            전체 주류
          </ChipButton>
          <ChipButton
            variant={'primary'}
            onClick={() => {
              activeStateHandler('beer');
            }}
            className={
              activeState === 'beer'
                ? classes['ChipButtonArea-active']
                : classes.ChipButtonArea
            }
          >
            맥주
          </ChipButton>
          <ChipButton
            variant={'primary'}
            onClick={() => {
              activeStateHandler('tradition');
            }}
            className={
              activeState === 'tradition'
                ? classes['ChipButtonArea-active']
                : classes.ChipButtonArea
            }
          >
            전통주
          </ChipButton>
        </Flex>
        <Flex w={'100%'} justify={'flex-end'} align={'center'} mt={`1rem`}>
          <Anchor
            href={`/drink?select=${activeState}`}
            component={Link}
            size={`base`}
            fw={600}
            p={0}
            bg={`none`}
            lh={'2.5rem'}
            style={{
              textDecoration: 'none',
            }}
            className={classes['another-drink-list']}
          >
            <Flex justify={'center'} align={'center'} gap={8}>
              <Text>더보기</Text>
              <Image
                src={AngleRight}
                width={24}
                height={24}
                alt={'angle-right'}
              />
            </Flex>
          </Anchor>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MainDrinkHeader;
