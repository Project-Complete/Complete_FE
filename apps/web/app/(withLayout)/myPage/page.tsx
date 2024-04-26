import MyPageLeftSideBarWrapper from './(components)/LeftSideBarWrapper';
import classes from './MyPageLayout.module.scss';

const MyPageWrapper = () => {
  return (
    <div className={classes.MyPageWrapper}>
      <div className={classes.MyPageLeftSideContainer}>
        <MyPageLeftSideBarWrapper />
      </div>
      <div></div>
    </div>
  );
};

export default MyPageWrapper;
