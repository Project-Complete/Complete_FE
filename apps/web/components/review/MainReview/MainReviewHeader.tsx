import { Button, Flex, UnstyledButton } from "@mantine/core";
import AngleRight from '@/assets/angleRight.svg';
import Image from 'next/image'

const MainReviewHeader = () => {
    return <Flex w={"100%"} direction={'column'}>
        <Flex w={"100%"} h={60} >
            나의 인생 술, 추천합니다!
        </Flex>
        <Flex w={'100%'}>
            <Flex>
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
            <Flex w={"100%"} justify={'flex-end'}>
                <UnstyledButton component='a'>
                    <Flex justify={'center'} align={'center'}>
                        <Flex>
                            더보기
                        </Flex>
                        <Image src={AngleRight} width={24} height={24} alt={'angle-right'} />
                    </Flex>
                </UnstyledButton>
            </Flex>
        </ Flex>
    </Flex>
}
export default MainReviewHeader;