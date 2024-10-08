'use client';
import React, { Fragment } from 'react';
import classes from './Footer.module.scss';

const menuItems = [
  '이용약관',
  '이벤트',
  '제휴문의',
  '개인정보 처리방침 및 청소년 보호정책',
];

type FooterPropsType = {
  useFooter?: boolean;
};

const Footer = ({ useFooter = false }: FooterPropsType) => {
  return (
    <>
      {!useFooter && (
        <footer className={classes['footer-wrapper']}>
          <div>
            <div className={classes['footer-menu']}>
              {menuItems.map((item, idx) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
          <div className={classes['copyright-contact']}>
            <div>
              <div>찰랑</div>
              <p>
                Sed elementum tempus egestas sed.
                <br />
                Cursus sit amet dictum sit amet justo donec enim diam.
                <br />
                Copyright @ OOO ALL RIight Reserved.
              </p>
            </div>
            <div>
              <div>Contact us</div>
              <p>
                Sed elementum tempus egestas sed.
                <br />
                Cursus sit amet dictum sit amet justo donec enim diam.
                <br />
                Copyright @ OOO ALL RIight Reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
