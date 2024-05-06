'use client';

import { TabsPanel } from '@team-complete/complete-ui';
import { TabList, Tabs, Tab } from '@team-complete/complete-ui';

import classes from './center.module.scss';
import MyPageCenterReviewList from './ReviewList';
import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';

const MenuTabs = ['주류리뷰', '좋아요 한 게시글', '북마크'];

const MyPageCenterTabs = ({ index }: { index: number }) => {
  const { data: myInfoData } = useMyInfoQuery();
  return (
    <>
      {myInfoData && MenuTabs[index] !== undefined && (
        <Tabs
          defaultValue={MenuTabs[index]!}
          className={classes.menuCenterTabs}
        >
          <TabList className={classes.menuCenterTabs}>
            <Tab
              value={MenuTabs[index]!}
              onClick={() => {}}
              className={classes.menuCenterTabs}
            >
              {MenuTabs[index]}
            </Tab>
          </TabList>
          <TabsPanel value={MenuTabs[index]!}>
            <MyPageCenterReviewList myInfoData={myInfoData} />
          </TabsPanel>
        </Tabs>
      )}
    </>
  );
};

export default MyPageCenterTabs;
