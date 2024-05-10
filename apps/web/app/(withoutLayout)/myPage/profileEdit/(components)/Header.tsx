'use client';

import { Box, Flex, Text, UnstyledButton } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MyPageProfileEditHeader = () => {
  const router = useRouter();
  return (
    <Flex w={'100%'} h={'5rem'} gap={12}>
      <UnstyledButton
        onClick={() => {
          router.back();
        }}
      >
        <Flex p={'0.5rem'} align={'center'}>
          <Image src='/icons/왼쪽.svg' alt='왼쪽' width={40} height={40} />
        </Flex>
      </UnstyledButton>
      <Flex align={'center'}>
        <Text fz={'1.5rem'} fw={800} lh={'2.5rem'}>
          프로필 편집
        </Text>
      </Flex>
    </Flex>
  );
};

export default MyPageProfileEditHeader;
