'use client';

import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';
import MyPageContent from './Contents';
import MyInfo from './MyInfo';

const MobileProfile = () => {
  const { data: myInfoData } = useMyInfoQuery();
  if (myInfoData)
    return (
      <>
        <MyInfo myInfoData={myInfoData} />
        <MyPageContent myInfoData={myInfoData} />
      </>
    );
  else {
    return null;
  }
};

export default MobileProfile;
