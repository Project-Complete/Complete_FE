'use client';

import { Flex, Text, em } from '@mantine/core';
import { Chip } from '@team-complete/complete-ui';
import Image from 'next/image';
import classes from './Detail.module.scss';
import { useMediaQuery } from '@mantine/hooks';

const DetailFlavorChip = ({
  index,
  flavor,
}: {
  index: number;
  flavor: FlavorStatistic;
}) => {
  const isMobile = useMediaQuery(`(max-width:${em(768)})`);
  if (index === 1) {
    return (
      <Chip className={`${classes['chip-box']} ${classes['chip']}`}>
        <Image
          src='/icons/crown-gold.svg'
          alt='왕관'
          width={isMobile ? 24 : 40}
          height={isMobile ? 24 : 40}
        ></Image>
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'}>
          {index}위
        </Text>
        <Image src='/구분선.png' alt='구분선' width={2} height={16} />
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'} miw={'fit-content'}>
          {flavor.flavor}
        </Text>
      </Chip>
    );
  } else if (index === 2) {
    return (
      <Chip className={`${classes['chip-box']} ${classes['chip2']}`}>
        <Flex
          w={isMobile ? 24 : 40}
          h={isMobile ? 24 : 40}
          justify={'center'}
          align={'center'}
        >
          <Image
            src='/icons/crown-silver.svg'
            alt='왕관'
            width={isMobile ? 16 : 32}
            height={isMobile ? 16 : 32}
          ></Image>
        </Flex>
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'}>
          {index}위
        </Text>
        <Image src='/구분선.png' alt='구분선' width={2} height={16} />
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'} miw={'fit-content'}>
          {flavor.flavor}
        </Text>
      </Chip>
    );
  } else if (index === 3) {
    return (
      <Chip className={`${classes['chip-box']} ${classes['chip3']}`}>
        <Flex
          w={isMobile ? 24 : 40}
          h={isMobile ? 24 : 40}
          justify={'center'}
          align={'center'}
        >
          <Image
            src='/icons/crown-bronze.svg'
            alt='왕관'
            width={isMobile ? 12 : 24}
            height={isMobile ? 12 : 24}
          ></Image>
        </Flex>
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'}>
          {index}위
        </Text>
        <Image src='/구분선.png' alt='구분선' width={2} height={16} />
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'} miw={'fit-content'}>
          {flavor.flavor}
        </Text>
      </Chip>
    );
  }
};

export default DetailFlavorChip;
