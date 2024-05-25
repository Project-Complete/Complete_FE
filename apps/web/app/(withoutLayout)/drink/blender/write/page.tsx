'use client'
import { Flex, Box, Divider, Input } from '@mantine/core';
import { Button } from '@team-complete/complete-ui';
import containerCss from './container.module.scss';
import LoginButton from '@/components/login/LoginButton';
import Image from 'next/image';
import camera from '@/assets/icons/카메라.svg';
import CustomDropZone from './(components)/CustomDropZone';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

const schema = z.object({
    file: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    combinations: z.array(z.object({
        drink_id: z.number(),
        name: z.string(),
        volume: z.string(),
        xcoordinate: z.number(),
        ycoordinate: z.number(),
    }))
})

export default function Page(): JSX.Element {
    const blenderWriteForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            file: '',
            title: '',
            description: '',
            content: '',
            combinations: [],
        },
        validate: zodResolver(schema),
    })


    return <>
        <Flex classNames={containerCss} direction={'column'}>
            <Flex py={24} gap={12} align={'center'} w={'100%'}>
                <Flex fz={24} fw={800} lh={'40px'}>한잔 말아먹기</Flex>
                <Divider orientation="vertical" h={16} style={{ alignSelf: 'center' }} />
                <Flex fz={18} fw={500} lh={"24px"} >칠러님의 한 잔을 소개해주세요!</Flex>
            </Flex >
            <Divider />
            <Flex className={containerCss['responsive']} gap={32} w={'100%'}>
                <Flex direction={'column'} c={'#00000073'}>
                    <CustomDropZone />
                    <Flex fz={16} fw={500} lh={'16px'} py={9}>칠러님의 한 잔에 대한 사진은 필수입니다.</Flex>
                </Flex>
                <Flex direction={'column'} w={'100%'}>
                    <Flex direction={'column'} gap={32}>
                        <Input.Wrapper
                            label={<Flex>칠러님의 한 잔에 이름을 붙여주세요!</Flex>}
                            error={<Flex>한 잔의 이름은 필수 입니다.</Flex>}
                        >
                            <Input placeholder='한 잔 이름' {...blenderWriteForm.getInputProps('title')} />
                        </Input.Wrapper>
                        <Input.Wrapper
                            label={<Flex>한 잔을 한 줄 소개한다면?</Flex>}
                            error={<Flex>한 잔 소개는 필수 입니다.</Flex>}
                        >
                            <Input placeholder='한 잔 소개하기' {...blenderWriteForm.getInputProps('description')} />
                        </Input.Wrapper>
                        <Input.Wrapper
                            label={<Flex>어떻게 만들면 되나요</Flex>}
                            error={<Flex>어떻게 만드는 지 알려주세요.</Flex>}
                        >
                            <Input placeholder='한 잔 만드는 방법' {...blenderWriteForm.getInputProps('content')} />
                        </Input.Wrapper>
                    </Flex>
                    <Flex direction={'column'} gap={12} w={'100%'}>
                        <Flex>한 잔을 위한 재료</Flex>
                        {Array.from({ length: 10 }).map((_, index) => {
                            return < Flex gap={16} key={index}>
                                <Input.Wrapper
                                    w={'100%'}
                                    label={index === 0 ? <Flex h={20} mb={8}>재료</Flex> : null}
                                >
                                    <Input placeholder='ex) 소주' />
                                </Input.Wrapper>
                                <Input.Wrapper
                                    w={'100%'}
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
            <Flex>
                <Button>작성 취소</Button>
                <Button>작성 완료</Button>
            </Flex>
        </Flex >
    </>
}
