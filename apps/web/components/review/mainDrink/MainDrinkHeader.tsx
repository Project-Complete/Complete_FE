'use client';
import { Flex, UnstyledButton } from '@mantine/core';
import { ChipButton } from '@team-complete/complete-ui';
import AngleRight from '@/assets/angleRight.svg';
import Image from 'next/image';
import classes from './MainDrinkHeader.module.css';

const MainDrinkHeader = ({
  activeState,
  activeStateHandler,
}: {
  activeState: 'all' | 'beer' | 'tradition';
  activeStateHandler: (value: 'all' | 'beer' | 'tradition') => void;
}) => {
  return (
    <Flex w={'100%'} direction={'column'}>
      <Flex
        w={'100%'}
        h={60}
        mt={'4.5rem'}
        className={classes['review-main-title']}
        mb={30}
      >
        나의 인생 주류, 추천합니다!
      </Flex>
      <Flex w={'100%'} mb={24}>
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
        <Flex w={'100%'} justify={'flex-end'} align={'center'}>
          <UnstyledButton component='a'>
            <Flex justify={'center'} align={'center'} gap={8}>
              더보기
              <Image
                src={AngleRight}
                width={24}
                height={24}
                alt={'angle-right'}
              />
            </Flex>
          </UnstyledButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MainDrinkHeader;
