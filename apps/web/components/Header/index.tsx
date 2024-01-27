import classes from './HeaderWrapper.module.css';
import { Flex } from '@mantine/core';
import HeaderNavWrapper from './Nav';
import HeaderCenterWrapper from './SearchBar';

const HeaderWrapper = () => {
  return (
    <Flex
      w={'100%'}
      h={232}
      direction={`column`}
      align={`center`}
      pos={`relative`}
      className={classes.headerWrapper}
    >
      <Flex
        w={`100%`}
        h={52}
        className={classes[`hedaer-banner`]}
        bg={`#F2F3F3`}
      ></Flex>
      <Flex w={`100%`} h={120} className={classes[`header-center`]}>
        <HeaderCenterWrapper />
      </Flex>
      <Flex w={`100%`} mih={60} pos={`sticky`}>
        <HeaderNavWrapper />
      </Flex>
    </Flex>
  );
};

export default HeaderWrapper;
