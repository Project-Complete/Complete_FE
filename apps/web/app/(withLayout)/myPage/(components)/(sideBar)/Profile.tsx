'use client';

import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';
import { Avatar } from '@mantine/core';
import classes from './Profile.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const MyPageLeftSideBarMyProfile = () => {
  const { data: myInfoData } = useMyInfoQuery();
  if (myInfoData) {
    return (
      <>
        <div className={classes.profileWrapper}>
          <div className={classes.profile}>
            <Image
              className={classes.profileBackground}
              src='/myProfileBackGround.png'
              alt='마이프로필 배경화면'
              fill
            />
            <div className={classes.profileImageWrapper}>
              <Avatar
                src={myInfoData.profile_image_url}
                alt='no image here'
                w={'8.25rem'}
                h={'8.25rem'}
              ></Avatar>
              <Link href='/myPage/profileEdit'>
                <button className={classes.profileImageModifyButton}>
                  <Image
                    src='/icons/pencilButton.svg'
                    alt='프로필 이미지 변경 버튼'
                    width={40}
                    height={40}
                  />
                </button>
              </Link>
            </div>
            <div className={classes.profileNickname}>{myInfoData.nickname}</div>
            {myInfoData.email !== null && (
              <div className={classes.profileEmail}>{myInfoData.email}</div>
            )}
          </div>
          {/* <div className={classes.profileFollowWrapper}>
            <div className={classes.profileFollowFollowingBox}>
              <div className={classes.profileFollowFollowingBoxName}>
                팔로워
              </div>
              <div>{myInfoData.follower_count}명</div>
            </div>
            <Image src='/구분선.png' alt='구분선' width={1} height={32} />
            <div className={classes.profileFollowFollowingBox}>
              <div className={classes.profileFollowFollowingBoxName}>
                팔로우
              </div>
              <div>{myInfoData.following_count}명</div>
            </div>
          </div> */}
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default MyPageLeftSideBarMyProfile;
