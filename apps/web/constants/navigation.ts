export type NavigationType = {
  name: string;
  href?: string;
  menuList: {
    name: string;
    href: string;
  }[];
};

export const NAVIGATION_LIST: NavigationType[] = [
  {
    name: '홈',
    href: '/',
    menuList: [],
  },
  {
    name: '주류 리뷰',
    menuList: [
      {
        name: '전체',
        href: '/drink',
      },
      {
        name: '전통주',
        href: '/drink',
      },
      {
        name: '맥주',
        href: '/drink',
      },
    ],
  },
  {
    name: '본격적 칠링',
    menuList: [
      {
        name: '주류끼리 안주끼리',
        href: '/drink/blender?page=1',
      },
      {
        name: '한 잔의 칠링',
        href: '/drink/blender?page=1',
      },
    ],
  },
  {
    name: '커뮤니티',
    menuList: [
      {
        name: '공지사항',
        href: '/drink',
      },
      {
        name: '이벤트',
        href: '/drink',
      },
    ],
  },
];
