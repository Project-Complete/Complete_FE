import { ReactNode } from 'react';
import classes from './MyPageLayout.module.scss';

const MyPageLayout = ({ children }: { children: ReactNode }) => {
  return <div className={classes.MyPageLayout}>{children}</div>;
};

export default MyPageLayout;
