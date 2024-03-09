import { Flex } from '@mantine/core';
import Image from 'next/image';

interface LogoProps {
  symbolWidth?: number;
  symbolHeight?: number;
  typoWidth?: number;
  typoHeight?: number;
}

const Logo = ({
  symbolWidth = 52,
  symbolHeight = 52,
  typoWidth = 100,
  typoHeight = 45,
}: LogoProps) => {
  return (
    <Flex gap={'0.75rem'}>
      <Image
        src='/logo/심볼.svg'
        width={symbolWidth}
        height={symbolHeight}
        alt='로고 이미지'
      />
      <Image
        src='/logo/타이포.svg'
        width={typoWidth}
        height={typoHeight}
        alt='로고 이미지'
      />
    </Flex>
  );
};

export default Logo;
