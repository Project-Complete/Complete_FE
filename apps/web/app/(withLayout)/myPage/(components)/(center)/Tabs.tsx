'use client';

import MyPageDrinkList from './DrinksLike';
import MyPageCenterReviewList from './ReviewList';
import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';

const MyPageCenterTabs = ({ index }: { index: number }) => {
  const { data: myInfoData } = useMyInfoQuery();
  return (
    <>
      {myInfoData && index === 0 && (
        <MyPageCenterReviewList myInfoData={myInfoData} />
      )}
      {myInfoData && index === 1 && <MyPageDrinkList />}
    </>
  );
};

export default MyPageCenterTabs;
