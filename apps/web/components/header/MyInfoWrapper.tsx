'use client';
import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';
import {
  Avatar,
  Button,
  Flex,
  Popover,
  Text,
  UnstyledButton,
} from '@mantine/core';
import HeaderWriteButton from './searchBar/WriteButton';
import { Chip } from '@team-complete/complete-ui';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useState } from 'react';

import classes from './MyInfoWrapper.module.scss';

const HeaderMyInfoWrapper = () => {
  const [popoverOpened, setPopoverOpened] = useState<boolean>(false);

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
        <Popover opened={popoverOpened} onChange={setPopoverOpened}>
          <Popover.Target>
            <UnstyledButton onClick={() => setPopoverOpened(prev => !prev)}>
              <Chip variant={'ghost'} className={classes['MyNicknameWrapper']}>
                {myInfoData.nickname}
              </Chip>
            </UnstyledButton>
          </Popover.Target>
          <Popover.Dropdown>
            <Flex w={`11.5rem`} py={`0.5rem`} direction='column'>
              <Link href='/myPage' className={classes.MyNicknameWrapperFlex}>
                <Button
                  onClick={() => setPopoverOpened(prev => !prev)}
                  fullWidth
                  pl={0}
                  justify={`start`}
                  h={`2.215rem`}
                  pr={`0.5rem`}
                  py={`0.31rem`}
                  bg={`none`}
                >
                  <Text c={`#000`} size='0.875rem' w={`100%`} h={`1.5rem`}>
                    마이페이지
                  </Text>
                </Button>
              </Link>
              <Button
                onClick={() => {
                  Cookies.remove('access_token');
                  Cookies.remove('refresh_token');
                  setPopoverOpened(prev => !prev);
                  if (window) {
                    window.location.reload();
                  }
                }}
                fullWidth
                pl={0}
                justify={`start`}
                h={`2.215rem`}
                pr={`0.5rem`}
                py={`0.31rem`}
                bg={`none`}
              >
                <Text c={`#000`} size='0.875rem' w={`100%`} h={`1.5rem`}>
                  로그아웃
                </Text>
              </Button>
            </Flex>
          </Popover.Dropdown>
        </Popover>
        <Avatar src={myInfoData.profile_image_url} alt="It's me!" />
        <HeaderWriteButton isLogin={true} />
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
        <HeaderWriteButton isLogin={false} />
      </Flex>
    );
  }
};

export default HeaderMyInfoWrapper;
