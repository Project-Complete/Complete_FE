'use client';

import { Box, Flex, Text } from '@mantine/core';
import { useMyPageTabMenuContext } from '../../(store)/store';
import MyPageCenterTabs from './Tabs';
import { Chip } from '@team-complete/complete-ui';

import classes from './center.module.scss';

const MenuTabs = ['주류리뷰', '주류'];

const MyPageCenterWrapper = () => {
  const myPageContext = useMyPageTabMenuContext();

  return (
    <Box className={classes.Wrapper}>
      {myPageContext && myPageContext.menuItemsState && (
        <Flex justify={'space-between'}>
          <Text fz={'2rem'} fw={800} lh={'2.5rem'}>
            {
              myPageContext.menuItemsState.items[
                myPageContext.menuItemsState.selectedIndex
              ]
            }
          </Text>
          <Chip variant={'primary'} className={classes.tabs}>
            <span>{MenuTabs[myPageContext.menuItemsState.selectedIndex]}</span>
          </Chip>
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
