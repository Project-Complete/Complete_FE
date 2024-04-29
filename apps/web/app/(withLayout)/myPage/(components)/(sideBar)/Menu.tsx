import { Box } from '@mantine/core';
import MyProfileMenuList from './MenuList';
export interface MenuList {
  title: string;
  items: string[];
  selected: boolean;
  selectedIndex: number;
}

const MyPage: MenuList = {
  title: '마이페이지',
  items: [
    '내가 작성한 게시글',
    '나의 좋아요',
    '나의 북마크',
    '주류 리뷰 작성하기',
  ],
  selected: false,
  selectedIndex: -1,
};

const more: MenuList = {
  title: '더보기',
  items: ['프로필 편집하기', '1:1 문의', '신고', '로그아웃', '회원 탈퇴'],
  selected: false,
  selectedIndex: -1,
};

const MyProfileMenu = () => {
  return (
    <>
      <MyProfileMenuList data={MyPage} />
      <MyProfileMenuList data={more} />
    </>
  );
};

export default MyProfileMenu;
