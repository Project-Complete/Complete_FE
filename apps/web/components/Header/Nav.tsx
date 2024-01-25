'use client';
import { Burger, Button, Flex, UnstyledButton } from '@mantine/core';
import classes from './HeaderWrapper.module.css';
import Link from 'next/link';
import HeaderNavCollape from './NavCollape';
import { useDisclosure } from '@mantine/hooks';

const HeaderNav = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Flex
      w={`100%`}
      h={60}
      justify={`flex-start`}
      align={`center`}
      className={classes[`position`]}
    >
      <nav className={classes[`header-nav`]}>
        <div className={classes[`header-nav-bugger-div`]}>
          <Burger className={classes[``]} onClick={toggle}></Burger>
        </div>

        <div className={classes[`header-nav-div-link-right`]}>
          <Button
            classNames={{ label: classes.textColor }}
            variant='transparent'
            onClick={toggle}
          >
            홈
          </Button>
        </div>

        <div className={classes[`header-nav-right-border-wrapper`]}>
          <div className={classes[`header-nav-right-border`]}></div>
        </div>

        <div className={classes[`header-nav-div-link`]}>
          <Button
            classNames={{ label: classes.textColor }}
            variant='transparent'
            onClick={toggle}
          >
            술
          </Button>
        </div>

        <div className={classes[`header-nav-right-border-wrapper`]}>
          <div className={classes[`header-nav-right-border`]}></div>
        </div>

        <div className={classes[`header-nav-div-link`]}>
          <Button
            classNames={{ label: classes.textColor }}
            variant='transparent'
            onClick={toggle}
          >
            커뮤니티
          </Button>
        </div>
      </nav>
      <HeaderNavCollape opened={opened} />
    </Flex>
  );
};

export default HeaderNav;
