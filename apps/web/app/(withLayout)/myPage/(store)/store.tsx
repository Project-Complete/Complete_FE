import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

export interface MenuList {
  title: string;
  items: string[];
  selectedIndex: number;
}

const MyPageTabMenuContext = createContext<{
  menuItemsState: MenuList;
  onClickMenuItem: (selectIndex: number) => void;
} | null>(null);

export const useMyPageTabMenuContext = () => {
  const value = useContext(MyPageTabMenuContext);
  if (value === undefined) {
    throw new Error('use context 에러! provider를 확인하시오');
  } else {
    return value;
  }
};

export default function MyPageTabStore({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MenuList>({
    title: '마이페이지',
    items: [
      '내가 작성한 게시글',
      '나의 좋아요',
      '나의 북마크',
      '주류 리뷰 작성하기',
    ],
    selectedIndex: 0,
  });

  console.log(state);

  const onClickMenuItem = useCallback(
    (selectIndex: number) => {
      setState(prev => {
        return {
          ...prev,
          selectedIndex: selectIndex,
        };
      });
    },
    [state],
  );

  return (
    <MyPageTabMenuContext.Provider
      value={{ menuItemsState: state, onClickMenuItem }}
    >
      {children}
    </MyPageTabMenuContext.Provider>
  );
}
