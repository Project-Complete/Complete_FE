'use client';

import { Box, Text } from '@mantine/core';
import { useMyPageTabMenuContext } from '../../(store)/store';
import classes from './center.module.scss';
import MyPageCenterTabs from './Tabs';

const MyPageCenterWrapper = () => {
  const myPageContext = useMyPageTabMenuContext();

  return (
    <Box className={classes.Wrapper}>
      {myPageContext && myPageContext.menuItemsState && (
        <Text fz={'2rem'} fw={800} lh={'2.5rem'}>
          {
            myPageContext.menuItemsState.items[
              myPageContext.menuItemsState.selectedIndex
            ]
          }
        </Text>
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
