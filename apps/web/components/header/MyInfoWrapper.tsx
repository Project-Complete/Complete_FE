'use client';
import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';
import { Avatar, Flex } from '@mantine/core';
import HeaderWriteButton from './searchBar/WriteButton';
import { Chip } from '@team-complete/complete-ui';
import Link from 'next/link';

import classes from './MyInfoWrapper.module.scss';

const HeaderMyInfoWrapper = () => {
  const { data: myInfoData } = useMyInfoQuery();
  if (myInfoData) {
    return (
      <Flex
        h={'100%'}
        align={'center'}
        gap={'0.75rem'}
        justify={'flex-end'}
        w={'100%'}
      >
        <Link href='/myPage' className={classes.MyNicknameWrapperFlex}>
          <Chip variant={'ghost'} className={classes['MyNicknameWrapper']}>
            {myInfoData.nickname}
          </Chip>
        </Link>
        <Avatar src={myInfoData.profile_image_url} alt="It's me!" />
        <HeaderWriteButton />
      </Flex>
    );
  } else {
    return (
      <Flex
        h={'100%'}
        align={'center'}
        justify={'flex-end'}
        w={'100%'}
        gap={'0.75rem'}
      >
        <HeaderWriteButton />
      </Flex>
    );
  }
};

export default HeaderMyInfoWrapper;
