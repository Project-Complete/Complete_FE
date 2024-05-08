'use client';

import { Flex } from '@mantine/core';
import MyPageProfileEdit from './(components)/Profile';
import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';

const MypageProfileEdit = () => {
  const { data: myInfoData } = useMyInfoQuery();
  if (myInfoData) {
    return (
      <Flex>
        <MyPageProfileEdit myInfoData={myInfoData} />
      </Flex>
    );
  } else {
    return null;
  }
};

export default MypageProfileEdit;
