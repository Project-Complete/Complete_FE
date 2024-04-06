'use client';

import classes from './HeaderWrapper.module.css';
import { Flex } from '@mantine/core';
import HeaderNavWrapper from './nav';
import HeaderCenterWrapper from './searchBar';
import { usePathname } from 'next/navigation';

const HeaderWrapper = (props: any) => {
  const pathname = usePathname();
  const isLogin = pathname === '/login';
  return (
    <>
      {/* <Flex
        w={`100%`}
        h={52}
        className={classes[`hedaer-banner`]}
        bg={`#F2F3F3`}
      ></Flex> */}
      <Flex
        w={`100%`}
        h={120}
        className={classes[`header-center`]}
        data-login={isLogin ? 'true' : 'false'}
      >
        <HeaderCenterWrapper isLogin={isLogin} />
      </Flex>
      {!isLogin && (
        <>
          <Flex
            w={`100%`}
            h={60}
            pos={`sticky`}
            top={0}
            bg={`#FFF`}
            style={{ zIndex: 10 }}
          >
            <Flex w={`100%`} h={`100%`} pos={`relative`} top={0}>
              <HeaderNavWrapper />
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default HeaderWrapper;
