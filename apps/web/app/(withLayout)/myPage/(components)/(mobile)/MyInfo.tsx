'use client';
import { Avatar, Menu, MenuItem, UnstyledButton } from '@mantine/core';
import classes from './Profile.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { MyUserInfo } from '@/types/userInfo';

const MyInfo = ({ myInfoData }: { myInfoData: MyUserInfo }) => {
  const router = useRouter();
  if (myInfoData) {
    return (
      <div className={classes[`mobile-profile-wrapper`]}>
        <div className={classes[`profile-image`]}>
          <Avatar
            src={myInfoData.profile_image_url}
            alt='no image here'
            w={'5rem'}
            h={'5rem'}
          ></Avatar>
        </div>
        <div className={classes[`profile-image`]}>
          <div className={classes[`profile-nickname`]}>
            {myInfoData.nickname}
          </div>
          {myInfoData.email !== null && (
            <div className={classes[`profile-email`]}>{myInfoData.email}</div>
          )}
        </div>
        <div className={classes[`profile-etc-menu`]}>
          <Menu position='bottom-end' offset={-10}>
            <Menu.Target>
              <UnstyledButton>
                <Image
                  src='더보기.svg'
                  alt='더보기 버튼'
                  width={24}
                  height={24}
                />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <MenuItem
                onClick={() => {
                  router.push('/myPage/profileEdit');
                }}
              >
                프로필 편집하기
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Cookies.remove('access_token');
                  Cookies.remove('refresh_token');
                  window.location.reload();
                }}
              >
                로그아웃
              </MenuItem>
              <MenuItem>회원 탈퇴</MenuItem>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default MyInfo;