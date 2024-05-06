'use client';

import MyPageCenterWrapper from './(components)/(center)/Wrapper';
import MyPageLeftSideBarWrapper from './(components)/(sideBar)/Wrapper';
import MyPageTabStore from './(store)/store';
import classes from './MyPageLayout.module.scss';

const MyPageWrapper = () => {
  return (
    <MyPageTabStore>
      <div className={classes.MyPageWrapper}>
        <div className={classes.MyPageLeftSideContainer}>
          <MyPageLeftSideBarWrapper />
        </div>
        <div className={classes.Wrapper}>
          <MyPageCenterWrapper />
        </div>
      </div>
    </MyPageTabStore>
  );
};

export default MyPageWrapper;
