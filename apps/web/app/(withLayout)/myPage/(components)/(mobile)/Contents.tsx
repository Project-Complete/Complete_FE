'use client';

import { Tabs } from '@mantine/core';
import { Chip, Tab, TabList } from '@team-complete/complete-ui';
import MyPageDrinkList from '../(center)/DrinksLike';
import MyPageCenterReviewList from '../(center)/ReviewList';
import { MyUserInfo } from '@/types/userInfo';

import classes from './Content.module.scss';

const MyPageContent = ({ myInfoData }: { myInfoData: MyUserInfo }) => {
  return (
    <>
      <Tabs defaultValue='내가 작성한 게시물'>
        <TabList>
          <Tab value='내가 작성한 게시물'>내가 작성한 게시물</Tab>
          <Tab value='나의 좋아요'>나의 좋아요</Tab>
        </TabList>
        <Tabs.Panel value={'내가 작성한 게시물'}>
          <Chip variant={'primary'} className={classes.tabs}>
            <span>주류 리뷰</span>
          </Chip>
          <MyPageCenterReviewList myInfoData={myInfoData} />
        </Tabs.Panel>
        <Tabs.Panel value={'나의 좋아요'}>
          <Chip variant={'primary'} className={classes.tabs}>
            <span>주류</span>
          </Chip>
          <MyPageDrinkList />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default MyPageContent;
