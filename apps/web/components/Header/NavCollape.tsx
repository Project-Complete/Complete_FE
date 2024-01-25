'use client';
import { Collapse, Box } from '@mantine/core';
import classes from './HeaderWrapper.module.css';
import Link from 'next/link';

const HeaderNavCollape = ({ opened }: { opened: boolean }) => {
  return (
    <Box maw={`100%`} className={classes[`header-nav-collape`]}>
      <Collapse in={opened}>
        <nav className={classes[`header-nav-collape-nav`]}>
          <div className={classes[`header-nav-bugger-div`]}>
            <div className={classes[`header-nav-collape-left-blank`]} />
          </div>

          <div className={classes[`header-nav-div-link-right`]}>
            <div className={classes[`header-nav-collape-link`]}></div>
          </div>

          <div className={classes[`header-nav-right-border-wrapper`]}>
            <div className={classes[`header-nav-collape-blank`]}></div>
          </div>

          <div className={classes[`header-nav-collape-div-link`]}>
            <Link href='/drink' className={classes[`header-nav-collape-link`]}>
              전체
            </Link>
            <Link href='/drink' className={classes[`header-nav-collape-link`]}>
              전통주
            </Link>
            <Link href='/drink' className={classes[`header-nav-collape-link`]}>
              맥주
            </Link>
          </div>

          <div className={classes[`header-nav-right-border-wrapper`]}>
            <div className={classes[`header-nav-collape-blank`]}></div>
          </div>

          <div className={classes[`header-nav-collape-div-link`]}>
            <Link
              href='/community'
              className={classes[`header-nav-collape-link`]}
            >
              술끼리 안주끼리 조합
            </Link>
            <Link
              href='/community'
              className={classes[`header-nav-collape-link`]}
            >
              한잔 말아먹기
            </Link>
          </div>
        </nav>
      </Collapse>
    </Box>
  );
};

export default HeaderNavCollape;
