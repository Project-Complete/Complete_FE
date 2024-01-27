import { Button, Flex, UnstyledButton } from "@mantine/core";
import AngleRight from '@/assets/angleRight.svg';
import Image from 'next/image'
import classes from './MainReviewHeader.module.css'

const MainReviewHeader = () => {
    return <Flex w={"100%"} direction={'column'}>
        <Flex w={"100%"} h={60} className={classes['review-main-title']} mb={30}>
            나의 인생 술, 추천합니다!
        </Flex>
        <Flex w={'100%'} mb={24}>
            <Flex className={classes['review-filter-button-layout']} gap={20}>
                <Button radius={32} w={73} h={44} className={classes['review-filter-button']}>
                    전체
                </Button>
                <Button radius={32} w={73} h={44} className={classes['review-filter-button']}>
                    맥주
                </Button>
                <Button radius={32} w={73} h={44} className={classes['review-filter-button']}>
                    소주
                </Button>
            </Flex>
            <Flex w={"100%"} justify={'flex-end'} align={'center'}>
                <UnstyledButton component='a'>
                    <Flex justify={'center'} align={'center'} gap={8}>
                        더보기
                        <Image src={AngleRight} width={24} height={24} alt={'angle-right'} />
                    </Flex>
                </UnstyledButton>
            </Flex>
        </ Flex>
    </Flex>
}
export default MainReviewHeader;