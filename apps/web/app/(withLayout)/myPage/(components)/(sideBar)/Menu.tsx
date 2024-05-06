'use client';

import { useState } from 'react';
import MyProfileMenuList from './MenuList';
import { MenuList, useMyPageTabMenuContext } from '../../(store)/store';

const MyProfileMenu = () => {
  const myPageContext = useMyPageTabMenuContext();
  
  const [moreState, setMoreState] = useState<MenuList>({
    title: '더보기',
    items: ['프로필 편집하기', '1:1 문의', '신고', '로그아웃', '회원 탈퇴'],
    selectedIndex: -1,
  });

  const myPageAction = (e: number) => {
    if (myPageContext) {
      myPageContext.onClickMenuItem(e);
    }
  };

  const moreAction = () => {};

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
