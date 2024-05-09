import Logo from '@/components/Logo';
import { Divider, Flex } from '@mantine/core';
import Link from 'next/link';

const DrinkWriteHeader = () => {
  return (
    <>
      <Flex w={'100%'} h={'5rem'} justify={'center'} align={'center'}>
        <Link href='/'>
          <Logo />
        </Link>
      </Flex>
      <Divider />
    </>
  );
};

export default DrinkWriteHeader;
