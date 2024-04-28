'use client';

import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';
import { Avatar } from '@mantine/core';
import classes from './Profile.module.scss';

const MyPageLeftSideBarMyProfile = () => {
  const { data: myInfoData } = useMyInfoQuery();
  console.log(myInfoData);
  if (myInfoData) {
    return (
      <>
        <div className={classes.profileWrapper}>
          <div>
            <Avatar
              src={myInfoData.profile_image_url}
              alt='no image here'
              w={'8.25rem'}
              h={'8.25rem'}
            ></Avatar>
            <div className={classes.profileNickname}>{myInfoData.nickname}</div>
            {myInfoData.email !== null && (
              <div className={classes.profileEmail}>{myInfoData.email}</div>
            )}
          </div>
          <div className={classes.profileFollowWrapper}>
            <div className={classes.profileFollowFollowingBox}>
              <div>팔로워</div>
              <div>{myInfoData.follower_count}명</div>
            </div>
            <div className={classes.profileFollowFollowingBox}>
              <div>팔로우</div>
              <div>{myInfoData.following_count}명</div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default MyPageLeftSideBarMyProfile;
