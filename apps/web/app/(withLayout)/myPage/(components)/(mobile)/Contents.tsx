'use client';

import { Flex, Tabs } from '@mantine/core';
import { Chip, Tab, TabList } from '@team-complete/complete-ui';
import MyPageDrinkList from '../(center)/DrinksLike';
import MyPageCenterReviewList from '../(center)/ReviewList';
import { MyUserInfo } from '@/types/userInfo';

import classes from './Content.module.scss';
import { useMyPageTabMenuContext } from '../../(store)/store';
import MyPageCombinationList from '../(center)/Combination';

const MenuTabs = ['주류리뷰', '주류', '한잔의 칠링'];

const MyPageContent = ({ myInfoData }: { myInfoData: MyUserInfo }) => {
  const myPageContext = useMyPageTabMenuContext();
  return (
    <>
      <Tabs defaultValue='내가 작성한 게시물'>
        <TabList>
          <Tab value='내가 작성한 게시물'>내가 작성한 게시물</Tab>
          <Tab value='나의 좋아요'>나의 좋아요</Tab>
        </TabList>
        <Tabs.Panel value={'내가 작성한 게시물'}>
          <Flex gap={8}>
            {myPageContext &&
              (myPageContext.menuItemsState.selectedIndex === 0 ? (
                <Flex gap={8}>
                  <Chip
                    variant={'primary'}
                    className={classes.tabs}
                    onClick={() => myPageContext.onClickMenuItem(0)}
                  >
                    <span>{MenuTabs[0]}</span>
                  </Chip>
                  <Chip
                    variant={'ghost'}
                    className={classes.tabs}
                    onClick={() => myPageContext.onClickMenuItem(2)}
                  >
                    <span>{MenuTabs[2]}</span>
                  </Chip>
                </Flex>
              ) : (
                <Flex gap={8}>
                  <Chip
                    variant={'ghost'}
                    className={classes.tabs}
                    onClick={() => myPageContext.onClickMenuItem(0)}
                  >
                    <span>{MenuTabs[0]}</span>
                  </Chip>
                  <Chip
                    variant={'primary'}
                    className={classes.tabs}
                    onClick={() => myPageContext.onClickMenuItem(2)}
                  >
                    <span>{MenuTabs[2]}</span>
                  </Chip>
                </Flex>
              ))}
          </Flex>
          {myPageContext &&
            myPageContext.menuItemsState.selectedIndex === 0 && (
              <MyPageCenterReviewList myInfoData={myInfoData} />
            )}
          {myPageContext &&
            myPageContext.menuItemsState.selectedIndex === 2 && (
              <MyPageCombinationList />
            )}
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
