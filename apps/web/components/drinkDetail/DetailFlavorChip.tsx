import { FlavorStatistic } from '@/types/drinks';
import { Flex, Text } from '@mantine/core';
import { Chip } from '@team-complete/complete-ui';
import Image from 'next/image';
import classes from './Detail.module.scss';

const DetailFlavorChip = ({
  index,
  flavor,
}: {
  index: number;
  flavor: FlavorStatistic;
}) => {
  if (index === 1) {
    return (
      <Chip className={`${classes['chip-box']} ${classes['chip']}`}>
        <Image
          src='/icons/crown-gold.svg'
          alt='왕관'
          width={40}
          height={40}
        ></Image>
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'}>
          {index}위
        </Text>
        <Image src='/구분선.png' alt='구분선' width={2} height={16} />
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'}>
          {flavor.flavor}
        </Text>
      </Chip>
    );
  } else if (index === 2) {
    return (
      <Chip className={`${classes['chip-box']} ${classes['chip2']}`}>
        <Flex w={40} h={40} justify={'center'} align={'center'}>
          <Image
            src='/icons/crown-silver.svg'
            alt='왕관'
            width={32}
            height={32}
          ></Image>
        </Flex>
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'}>
          {index}위
        </Text>
        <Image src='/구분선.png' alt='구분선' width={2} height={16} />
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'}>
          {flavor.flavor}
        </Text>
      </Chip>
    );
  } else if (index === 3) {
    return (
      <Chip className={`${classes['chip-box']} ${classes['chip3']}`}>
        <Flex w={40} h={40} justify={'center'} align={'center'}>
          <Image
            src='/icons/crown-bronze.svg'
            alt='왕관'
            width={24}
            height={24}
          ></Image>
        </Flex>
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'}>
          {index}위
        </Text>
        <Image src='/구분선.png' alt='구분선' width={2} height={16} />
        <Text size={'lg'} fw={700} lh={'xl'} mx={'0.5rem'}>
          {flavor.flavor}
        </Text>
      </Chip>
    );
  }
};

export default DetailFlavorChip;
