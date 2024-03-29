'use client';

import { Flex, Container, Button, Box } from '@mantine/core';
import Image from 'next/image';
import loginButtonCss from './loginButton.module.scss';
import { useRouter } from 'next/navigation';

type LoginButtonPropsType = {};
const LoginButton = ({}: LoginButtonPropsType) => {
  const loginTypeList = [
    {
      path: `/oauth2/authorization/naver`,
      content: '네이버 로그인',
      src: '/icons/naver-icon.svg',
      bg: '#03CF5D',
      c: '#FFFFFF',
    },
    {
      path: `/oauth2/authorization/kakao`,
      content: '카카오 로그인',
      src: '/icons/kakao-icon.svg',
      bg: '#FEE500',
      c: '#000000',
    },
    {
      path: `/oauth2/authorization/google`,
      content: '구글 로그인',
      src: '/icons/google-icon.svg',
      bg: '#FFF',
      c: '#000000',
    },
  ];

  return (
    <Flex direction={'column'} gap={16} justify={'center'} align={'center'}>
      {loginTypeList.map(({ content, src, bg, c, path }, index) => {
        return (
          <Button
            component='a'
            key={index}
            href={path}
            classNames={loginButtonCss}
            bg={bg}
            c={c}
            leftSection={
              <Image src={src} width={40} height={40} alt={'content'} />
            }
          >
            {content}
          </Button>
        );
      })}
    </Flex>
  );
};
export default LoginButton;
