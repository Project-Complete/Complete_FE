'use client';

import { Box, Flex, Text } from '@mantine/core';
import { useMyPageTabMenuContext } from '../../(store)/store';
import MyPageCenterTabs from './Tabs';
import { Chip } from '@team-complete/complete-ui';

import classes from './center.module.scss';

const MenuTabs = ['주류리뷰', '주류', '한잔의 칠링'];

const MyPageCenterWrapper = () => {
  const myPageContext = useMyPageTabMenuContext();

  return (
    <Box className={classes.Wrapper}>
      {myPageContext && myPageContext.menuItemsState && (
        <Flex justify={'space-between'}>
          <Text fz={'2rem'} fw={800} lh={'2.5rem'}>
            {
              myPageContext.menuItemsState.items[
                myPageContext.menuItemsState.selectedIndex % 2
              ]
            }
          </Text>
          {myPageContext.menuItemsState.selectedIndex % 2 === 0 ? (
            myPageContext.menuItemsState.selectedIndex === 0 ? (
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
            )
          ) : (
            <Chip variant={'primary'} className={classes.tabs}>
              <span>
                {MenuTabs[myPageContext.menuItemsState.selectedIndex]}
              </span>
            </Chip>
          )}
        </Flex>
      )}
      <Box mt={'2rem'} mb={'2rem'} className={classes.menuCenterTabs}>
        {myPageContext && myPageContext.menuItemsState && (
          <MyPageCenterTabs
            index={myPageContext.menuItemsState.selectedIndex}
          />
        )}
      </Box>
    </Box>
  );
};

export default MyPageCenterWrapper;
