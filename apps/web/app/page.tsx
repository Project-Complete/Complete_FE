import styles from './page.module.css';
import { Flex } from '@mantine/core';
import SelectedBanner from '../components/banner/SelectedBanner';
import MainReview from '@/components/review/mainDrink/MainDrink';

export default function Page(): JSX.Element {
  return (
    <Flex className={styles.main}>
      <Flex
        className={styles['banner']}
        w={'100%'}
        h={480}
        bg={'lime'}
        py={40}
        justify={'center'}
        align={'center'}
      >
        <SelectedBanner />
      </Flex>
      <MainReview />
    </Flex>
  );
}
