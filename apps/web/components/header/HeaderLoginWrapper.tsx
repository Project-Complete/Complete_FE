import classes from './HeaderWrapper.module.css';
import { Flex } from '@mantine/core';
import HeaderCenterWrapper from './searchBar';

const HeaderWrapper = () => {
  return (
    <>
      <Flex
        w={`100%`}
        h={120}
        className={classes[`header-center`]}
        data-login={true}
      >
        <HeaderCenterWrapper isCenter={true} />
      </Flex>
    </>
  );
};

export default HeaderWrapper;
