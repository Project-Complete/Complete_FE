'use client';

import { useState } from 'react';
import MyProfileMenuList from './MenuList';
import { MenuList, useMyPageTabMenuContext } from '../../(store)/store';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const MyProfileMenu = () => {
  const myPageContext = useMyPageTabMenuContext();
  const router = useRouter();

  const [moreState, setMoreState] = useState<MenuList>({
    title: '더보기',
    items: ['프로필 편집하기', '1:1 문의', '로그아웃', '회원 탈퇴'],
    selectedIndex: -1,
  });

  const myPageAction = (e: number) => {
    if (myPageContext) {
      myPageContext.onClickMenuItem(e);
    }
  };

  const moreAction = (e: number) => {
    if (e === 0) {
      router.push('/myPage/profileEdit');
    } else if (e === 1) {
    } else if (e === 2) {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      if (window) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      {myPageContext && myPageContext.menuItemsState && (
        <MyProfileMenuList
          data={myPageContext.menuItemsState}
          action={myPageAction}
        />
      )}
      <MyProfileMenuList data={moreState} action={moreAction} />
    </>
  );
};

export default MyProfileMenu;
