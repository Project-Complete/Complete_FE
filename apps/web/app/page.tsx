import Image from 'next/image';
import styles from './page.module.css';
import { Button, Flex } from '@mantine/core';
import SelectedBanner from '../components/banner/SelectedBanner';
import MantineUi from '../components/MantineUi';

export default function Page(): JSX.Element {
  return (
    <Flex className={styles.main}>
      <MantineUi />
      <Flex className='header' w={'100%'} h={244}>
        <Flex bg={'gray'} w={'100%'} justify={'center'} align={'center'}>
          header section
        </Flex>
      </Flex>
      <Flex className='Banner' w={'100%'} h={740}>
        <SelectedBanner />
      </Flex>
      <Flex>
        <Flex>나의 인생 술, 추천합니다!</Flex>
        <Button radius={32} w={73} h={44} bg={'#FFFFFF'}>
          전체
        </Button>
        <Button radius={32} w={73} h={44} bg={'#FFFFFF'}>
          맥주
        </Button>
        <Button radius={32} w={73} h={44} bg={'#FFFFFF'}>
          소주
        </Button>
      </Flex>
    </Flex>
  );
}
