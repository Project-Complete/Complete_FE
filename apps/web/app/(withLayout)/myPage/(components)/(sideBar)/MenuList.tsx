'use client';

import { Box, Flex, UnstyledButton } from '@mantine/core';
import Image from 'next/image';
import classes from './Profile.module.scss';
import { MenuList } from './Menu';
import { Fragment } from 'react';

const MyProfileMenuList = ({
  data,
  action,
}: {
  data: MenuList;
  action: (() => void) | ((e: number) => void);
}) => {
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
          <Fragment key={i}>
            {i === data.selectedIndex ? (
              <Flex
                w={'100%'}
                h={'2.5rem'}
                align={'center'}
                className={classes.profileMenuListSelectedItem}
              >
                <UnstyledButton
                  onClick={() => {
                    action(i);
                  }}
                >
                  {e}
                </UnstyledButton>
              </Flex>
            ) : (
              <Flex w={'100%'} h={'2.5rem'} align={'center'}>
                <UnstyledButton
                  onClick={() => {
                    action(i);
                  }}
                >
                  {e}
                </UnstyledButton>
              </Flex>
            )}
          </Fragment>
        ))}
      </>
    </Box>
  );
};

export default MyProfileMenuList;
