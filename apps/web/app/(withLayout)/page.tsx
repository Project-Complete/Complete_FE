import styles from './page.module.css';
import { Flex } from '@mantine/core';
import SelectedBanner from '../../components/banner/SelectedBanner';
import MainReview from '@/components/review/mainDrink/MainDrink';
import Banner from '@/components/banner/Banner';
import Image from 'next/image';

export default function Page(): JSX.Element {
  return (
    <Flex className={styles.main}>
      <Flex
        className={styles.banner}
        w={'100%'}
        bg={'lime'}
        py={40}
        justify={'center'}
        align={'center'}
        pos={'relative'}
      >
        <Image
          src={'./banner/home-header-맥주.svg'}
          alt='banner'
          layout='fill'
          objectFit='cover'
        />
        <Banner />
      </Flex>
      <MainReview />
    </Flex>
  );
}
