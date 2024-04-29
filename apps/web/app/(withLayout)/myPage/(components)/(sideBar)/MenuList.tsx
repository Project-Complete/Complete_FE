'use client';

import { Box, Flex } from '@mantine/core';
import Image from 'next/image';
import classes from './Profile.module.scss';
import { MenuList } from './Menu';

const MyProfileMenuList = ({ data }: { data: MenuList }) => {
  return (
    <Box w={'18rem'} mt={'1.5rem'}>
      <Flex
        w={'100%'}
        px={'1rem'}
        py={'0.75rem'}
        gap={'0.625rem'}
        bg={'#F2F3F3'}
        align={'center'}
        className={classes.profileMenuListWrapper}
        mb={'0.5rem'}
      >
        <Image src='/dot.svg' alt='Dot' width={12} height={12} />
        {data.title}
      </Flex>
      <>
        {data.items.map((e, i) => (
          <Flex key={i} w={'100%'} h={'2.5rem'} align={'center'}>
            {e}
          </Flex>
        ))}
      </>
    </Box>
  );
};

export default MyProfileMenuList;
