'use client';
import { Avatar } from '@mantine/core';
import classes from './Profile.module.scss';
import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';

const MobileProfile = () => {
  const { data: myInfoData } = useMyInfoQuery();
  if (myInfoData) {
    return (
      <div className={classes[`mobile-profile-wrapper`]}>
        <div>
          <Avatar
            src={myInfoData.profile_image_url}
            alt='no image here'
            w={'8.25rem'}
            h={'8.25rem'}
          ></Avatar>
        </div>
        <div>
          <div>{myInfoData.nickname}</div>
          {myInfoData.email !== null && <div>{myInfoData.email}</div>}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default MobileProfile;
