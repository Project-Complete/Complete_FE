'use client';

import { Flex, Button } from '@mantine/core';
import Image from 'next/image';
import loginButtonCss from './loginButton.module.scss';
import { LOGIN_TYPE_LIST } from '@/constants/login';


type LoginButtonPropsType = {};
const LoginButton = ({ }: LoginButtonPropsType) => {

  return (
    <Flex direction={'column'} w={'100%'} maw={600} gap={16} justify={'center'} align={'center'}>
      {LOGIN_TYPE_LIST.map(({ content, src, bg, c, path }, index) => {
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
