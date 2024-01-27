import Image from 'next/image';
import styles from './page.module.css';
import { Button, Flex, UnstyledButton } from '@mantine/core';
import SelectedBanner from '../components/Banner/SelectedBanner';
import MainReview from '@/components/review/MainReview/MainReview';

export default function Page(): JSX.Element {
    return <Flex className={styles.main}>
        <Flex className='header' w={'100%'} h={244}>
            <Flex bg={'gray'} w={'100%'} justify={'center'} align={'center'}>
                header section
            </Flex>
        </Flex>
        <Flex className='Banner' w={'100%'} h={740}>
            <SelectedBanner />
        </Flex>
        <MainReview />
    </Flex>

}
