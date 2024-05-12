'use client';

import classes from './HeaderWrapper.module.css';
import { Flex } from '@mantine/core';
import HeaderNavWrapper from './nav';
import HeaderCenterWrapper from './searchBar';
import { useMediaQuery } from '@mantine/hooks';

type HeaderWrapperPropsType = {
  useNav?: boolean;
  isCenter?: boolean;
  isLogin?: boolean;
};

const HeaderWrapper = ({
  useNav = false,
  isCenter = false,
  isLogin = false,
}: HeaderWrapperPropsType) => {

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {isMobile ? <>
      </> :
        <>
          <Flex w={`100%`} h={120} className={classes[`header-center`]}>
            <HeaderCenterWrapper isCenter={isCenter} isLogin={isLogin} />
          </Flex>
          {!useNav && (
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
      }
    </>
  );
};

export default HeaderWrapper;
