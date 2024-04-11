'use client';
import { useDrinksBannerQuery } from '@/hooks/queries/useDrinksBannerQuery';
import SelectedBanner from './SelectedBanner';
import { Suspense } from 'react';

const Banner = () => {
  const { data } = useDrinksBannerQuery();
  console.log('data', data);
  const drinks = data?.drinks ?? [];
  const page_info = data?.page_info;
  return (
    <Suspense fallback={<>{'loading...'}</>}>
      <SelectedBanner drinks={drinks} />
    </Suspense>
  );
};
export default Banner;
