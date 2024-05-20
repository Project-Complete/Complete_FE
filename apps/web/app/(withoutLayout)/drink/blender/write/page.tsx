'use client'
import { Flex, Box, Divider, Button, Input } from '@mantine/core';
import containerCss from './container.module.scss';
import LoginButton from '@/components/login/LoginButton';
import Image from 'next/image';
import camera from '@/assets/icons/카메라.svg';

export default function Page(): JSX.Element {

    return <>
        <Flex classNames={containerCss} direction={'column'}>
            <Flex py={24} gap={12} justify={'center'} align={'center'} w={'100%'}>
                <Flex fz={24} fw={800} lh={'40px'}>한잔 말아먹기</Flex>
                <Divider orientation="vertical" h={16} style={{ alignSelf: 'center' }} />
                <Flex fz={18} fw={500} lh={"24px"} >칠러님의 한 잔을 소개해주세요!</Flex>
            </Flex >
            <Divider />
            <Flex className={containerCss['responsive']} gap={32}>
                <Flex direction={'column'} c={'#00000073'}>
                    <Flex w={384} h={384} bg={'#E5E6E8'} justify={'center'} align={'center'} gap={16} direction={'column'}>
                        <Flex direction={'column'} gap={8} justify={'center'} align={'center'} >
                            <Image
                                src={'/icons/카메라.svg'}
                                alt='camera'
                                width={24}
                                height={24}
                            />
                            <Flex fz={16} fw={500} lh={'16px'}>사진을 업로드해줏세요</Flex>
                        </Flex>
                        <Button w={179} h={40} radius={8} px={16} py={12} bg={'white'} c={'#000000A6'} fz={16} fw={500} lh={'16px'}>클릭해서 사진 불러오기</Button>
                    </Flex>
                    <Flex fz={16} fw={500} lh={'16px'} py={9}>칠러님의 한 잔에 대한 사진은 필수입니다.</Flex>
                </Flex>
                <Flex direction={'column'}>
                    <Flex direction={'column'} gap={32}>
                        <Input.Wrapper
                            label={<Flex>칠러님의 한 잔에 이름을 붙여주세요!</Flex>}
                            error={<Flex>한 잔의 이름은 필수 입니다.</Flex>}
                        >
                            <Input placeholder='한 잔 이름' />
                        </Input.Wrapper>
                        <Input.Wrapper
                            label={<Flex>한 잔을 한 줄 소개한다면?</Flex>}
                            error={<Flex>한 잔 소개는 필수 입니다.</Flex>}
                        >
                            <Input placeholder='한 잔 소개하기' />
                        </Input.Wrapper>
                        <Input.Wrapper
                            label={<Flex>어떻게 만들면 되나요</Flex>}
                            error={<Flex>어떻게 만드는 지 알려주세요.</Flex>}
                        >
                            <Input placeholder='한 잔 만드는 방법' />
                        </Input.Wrapper>
                    </Flex>
                    <Flex direction={'column'} gap={12}>
                        <Flex>한 잔을 위한 재료</Flex>
                        {Array.from({ length: 10 }).map((_, index) => {
                            return < Flex gap={16} key={index}>
                                <Input.Wrapper
                                    label={index === 0 ? <Flex h={20} mb={8}>재료</Flex> : null}
                                >
                                    <Input placeholder='ex) 소주' />
                                </Input.Wrapper>
                                <Input.Wrapper
                                    label={index === 0 ? <Flex h={20} mb={8}>용량</Flex> : null}
                                >
                                    <Input placeholder='ex) 소주 잔의 반' />
                                </Input.Wrapper>
                                <Flex direction={'column'}>
                                    {index === 0 ? <Flex h={20} mb={8}></Flex> : null}
                                    <Button bg={'white'} >
                                        <Image
                                            src={'/icons/휴지통.svg'}
                                            alt='delete'
                                            width={24}
                                            height={24}
                                        />
                                    </Button>
                                </Flex>

                            </Flex>
                        })}
                    </Flex>
                </Flex>
            </Flex >
        </Flex >
    </>
}
