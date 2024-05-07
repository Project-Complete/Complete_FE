'use client';

import classes from './center.module.scss';
import MyPageDrinkList from './DrinksLike';
import MyPageCenterReviewList from './ReviewList';
import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';
import { Box } from '@mantine/core';

const MenuTabs = ['주류리뷰', '내가 좋아하는 주류'];

const MyPageCenterTabs = ({ index }: { index: number }) => {
  const { data: myInfoData } = useMyInfoQuery();
  return (
    <>
      <Box className={classes.tabs}>
        <span>{MenuTabs[index]}</span>
      </Box>
      {myInfoData && index === 0 && (
        <MyPageCenterReviewList myInfoData={myInfoData} />
      )}
      {myInfoData && index === 1 && <MyPageDrinkList myInfoData={myInfoData} />}
    </>
  );
};

export default MyPageCenterTabs;
