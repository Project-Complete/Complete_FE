import { Flex, Box } from '@mantine/core';
import containerCss from './container.module.scss';
import LoginButton from '@/components/login/LoginButton';
import Image from 'next/image';

export default function Page(): JSX.Element {
  return (
    <>
      <Flex classNames={containerCss}>
        <Image
          src={'/banner/login_banner.png'}
          alt={'logo'}
          width={600}
          height={218}
          style={{ maxWidth: '600px', width: '100%', height: 'auto' }}
        />
        <LoginButton />
        <Flex>궁금하신 사항 있으신가요?</Flex>
      </Flex >
    </>
  );
}
