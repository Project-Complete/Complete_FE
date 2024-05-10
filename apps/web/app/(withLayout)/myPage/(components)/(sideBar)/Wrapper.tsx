import { Box } from '@mantine/core';
import MyProfileMenu from './Menu';
import MyPageLeftSideBarMyProfile from './Profile';


const MyPageLeftSideBarWrapper = () => {
  return (
    <div>
      <MyPageLeftSideBarMyProfile />
      <Box mb={'1.5rem'}></Box>
      <MyProfileMenu></MyProfileMenu>
    </div>
  );
};

export default MyPageLeftSideBarWrapper;
