import { ReactNode } from 'react';
import MyPageProfileEditHeader from './(components)/Header';
import { Box, Flex } from '@mantine/core';
import classes from './MyPageProfileEdit.module.scss';
import Footer from '@/components/footer/Footer';

const MyPageProfileEditLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Flex
        w={'100%'}
        justify={'center'}
        className={classes.MyPageProfileEditHeader}
      >
        <Flex w={'100%'} maw={1024}>
          <MyPageProfileEditHeader />
        </Flex>
      </Flex>
      <Box w={'100%'} mih={'70vh'} mt={'1.5rem'}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default MyPageProfileEditLayout;
