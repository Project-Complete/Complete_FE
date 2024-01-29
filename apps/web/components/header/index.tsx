import classes from './HeaderWrapper.module.css';
import { Flex } from '@mantine/core';
import HeaderNavWrapper from './nav';
import HeaderCenterWrapper from './searchBar';

const HeaderWrapper = () => {
  return (
    <>
      <Flex
        w={`100%`}
        h={52}
        className={classes[`hedaer-banner`]}
        bg={`#F2F3F3`}
      ></Flex>
      <Flex w={`100%`} h={120} className={classes[`header-center`]}>
        <HeaderCenterWrapper />
      </Flex>
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
  );
};

export default HeaderWrapper;
