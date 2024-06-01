'use client'
import { Avatar, Button, Divider, Flex, Input } from '@mantine/core';
import Image from 'next/image';
import heart from '@/assets/heart.svg';
import bookmark from '@/assets/bookmark.svg';
import blenderClasses from './Blender.module.scss';
import { useState } from 'react';
import { useForm } from '@mantine/form';

const Blender = () => {
    return <Flex w={600} direction={'column'} gap={12}>
        <Flex w={'100%'} h={600} bg={"#D9D9D9"}>
            빈 그림
        </Flex>
        <Flex direction={'column'} gap={12} my={12}>
            <Flex fz={18} fw={800} lh={'40px'}>
                주류 이름
            </Flex>
            <Flex align={'center'} gap={12} w={'100%'}>
                <Avatar size={40} radius={'100%'} src={''} />
                <Flex direction={'column'} w={'100%'} gap={4}>
                    <Flex fz={14} fw={400} lh={'16px'}>김성호</Flex>
                    <Flex fz={14} fw={400} lh={'16px'}>{'date'}</Flex>
                </Flex>
                <Flex w={24} h={'100%'}>
                    <Image src={'/icons/더보기.svg'} width={24} height={24} alt={'더보기'} />
                </Flex>
            </Flex>
            <Flex fz={16} fw={400} lh={'24px'}>산토끼 토끼야..어디를 가느냐ㅣ...깡총ㅇ깣오 삶이란 무엇인가 이힠나는 잘 모르겠다</Flex>
            <Flex align={'center'} justify={'flex-end'} gap={12}>
                <Flex align={'center'}>
                    <Image
                        src={heart}
                        alt='like'
                        style={{ padding: 8 }}
                        width={40}
                        height={40}
                    />
                    갯수
                </Flex>
                <Flex align={'center'}>
                    <Image
                        src={bookmark}
                        alt='bookmark'
                        style={{ padding: 8 }}
                        width={40}
                        height={40}
                    />
                    갯수
                </Flex>
            </Flex>
        </Flex>
        <Divider my={24} />
        <Flex p={24} gap={12} mb={24} direction={'column'} bg={'#F2F3F3'}>
            <Flex fz={18} fw={500} lh={'24px'}>만드는 방법</Flex>
            <Flex fz={16} fw={400} lh={'24px'}>와아ㅏㄱ 아침 찰랑찰랑 이 아악 공습경보 공습경보 으아아악</Flex>
        </Flex>
        <Flex direction={'column'}>
            <Flex fz={18} fw={500} lh={'24px'} mb={12}>
                사용 재료
            </Flex>
            <Flex mb={24}>
                대충 카드들
            </Flex>
            <Flex fz={16} fw={500} lh={'24px'} mb={24}> 댓글</Flex>
            <Flex gap={20} direction={'column'} w={'100%'}>
                <Flex w={'100%'} gap={8}>
                    <Avatar size={24} radius={'100%'} src={''} />
                    <Input classNames={{ input: blenderClasses['mantine-input'] }} w={'100%'} rightSectionWidth={'70'} rightSection={<Flex fz={14} fw={500} lh={'100%'}>{`(0/250)`}</Flex>} />
                    <Button fz={16} fw={500} lh={'16px'} h={40} w={60} mih={40} miw={60} m={0} p={0}>입력</Button>
                </Flex>
                {Array.from({ length: 3 }).map((_, index) => {
                    return <Flex key={index} direction={'column'} gap={4} justify={'center'}>
                        <Flex gap={12} justify={'center'} align={'center'}>
                            <Avatar size={24} radius={'100%'} src={''} />
                            <Flex w={'100%'} direction={'column'}>
                                <Flex fz={16} fw={500} lh={'24px'}>User Name</Flex>
                                <Flex fz={12} fw={500} lh={'16px'}>00 전</Flex>
                            </Flex>
                        </Flex>
                        <Flex fz={16} fw={400} lh={'24px'}>
                            댓글 쓰기 (0/100자) 댓글 쓰기 (0/100자) 댓글 쓰기 (0/100자) 댓글 쓰기 (0/100자) 댓글 쓰기 (0/100자) 댓글 쓰기 (0/100자) 댓글 쓰기 (0/1
                        </Flex>
                    </Flex>
                })}
            </Flex>
        </Flex>
    </Flex>
}
export default Blender;