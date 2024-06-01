'use client'
import { Flex, Box, Divider, Input, Image as MantineImage } from '@mantine/core';
import { Button } from '@team-complete/complete-ui';
import containerCss from './container.module.scss';
import LoginButton from '@/components/login/LoginButton';
import Image from 'next/image';
import camera from '@/assets/icons/카메라.svg';
import CustomDropZone from './(components)/CustomDropZone';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useRef, useState } from 'react';
import { IconCirclePlus } from '@tabler/icons-react';
import { randomId } from '@mantine/hooks';

function checkFileType(file: File) {
    if (file?.name) {
        const fileType = file.name.split(".").pop();
        if (fileType === 'image') return true;
    }
    return false;
}

const schema = z.object({
    file: z.any()
        .refine((file) => file.size < 10000000, "Max size is 5MB.")
        .refine((file) => checkFileType(file), "Only .pdf, .docx formats are supported.").nullable(),
    title: z.string().min(1, '한 잔의 이름은 필수 입니다.'),
    description: z.string().min(1, '한 잔 소개는 필수 입니다.'),
    content: z.string().min(1, '한 잔 만드는 방법은 필수 입니다.'),
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
            file: null,
            title: '',
            description: '',
            content: '',
            combinations: [],
        },
        validateInputOnBlur: true,
        validate: zodResolver(schema),
    });
    const [combinations, setCombinations] = useState<{ id: string, xcoodinate: number, ycoodinate: number }[]>([]);
    const [selectedCombinationId, setSelectedCombinationId] = useState<string | null>(null);



    const file = blenderWriteForm.getValues().file;
    const imageUrl = file ? URL.createObjectURL(file) : null;

    const handleAddCombination = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (selectedCombinationId !== null) return;
        const { clientX, clientY } = e;
        const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
        const xcoodinate = (clientX - left) / width;
        const ycoodinate = (clientY - top) / height;
        const id = randomId()
        setCombinations([...combinations, { id, xcoodinate, ycoodinate }]);
    }

    // const handleOnClickMoveCombinationAction = (
    //     e: React.MouseEvent<HTMLDivElement, MouseEvent>
    // ) => {
    //     const { clientX, clientY } = e;
    //     const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    //     const xcoodinate = (clientX - left) / width;
    //     const ycoodinate = (clientY - top) / height;
    //     const updatedCombinations = combinations.map((combination) => {
    //         return {
    //             ...combination,
    //             xcoodinate,
    //             ycoodinate,
    //         };
    //     });
    //     setCombinations(updatedCombinations);
    // }


    const imageRef = useRef<HTMLDivElement | null>(null);



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
                    {blenderWriteForm.getValues().file ? <Flex ref={imageRef} bg={'#E5E6E8'} pos={'relative'} justify={'center'} align={'center'} gap={16} onClick={handleAddCombination} draggable={true}>
                        {imageUrl && <>
                            <MantineImage fit="cover" w={384} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} style={{ pointerEvents: 'none' }}
                            // draggable={true}
                            />
                            {combinations.map((combination, index) => {
                                return <Flex
                                    // draggable={}
                                    key={index}
                                    pos={'absolute'}
                                    w={16}
                                    h={16}
                                    style={{
                                        pointerEvents: 'all',
                                        mouse: 'grab',
                                        top: combination.ycoodinate * 100 + '%',
                                        left: combination.xcoodinate * 100 + '%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    onMouseDown={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setSelectedCombinationId(combination.id);
                                    }}
                                    onMouseMove={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        if (selectedCombinationId && imageRef.current) {
                                            const { clientX, clientY } = e;
                                            const { top, left, width, height } = imageRef.current.getBoundingClientRect();
                                            const xcoodinate = (clientX - left) / width;
                                            const ycoodinate = (clientY - top) / height;
                                            const updatedCombinations = combinations.map((combination) => {
                                                if (combination.id === selectedCombinationId) {
                                                    return {
                                                        ...combination,
                                                        xcoodinate,
                                                        ycoodinate,
                                                    };
                                                }
                                                return combination;
                                            });
                                            setCombinations(updatedCombinations);
                                        }
                                    }}
                                    onMouseUp={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setSelectedCombinationId(null);

                                    }}

                                >
                                    <IconCirclePlus stroke={2} width={16} height={16} color={'#956faf'} />
                                </Flex>
                            })}
                        </>}
                    </Flex> : <CustomDropZone
                        onDrop={(files) => {
                            console.log('accepted files', files)
                            const file = files?.[0];
                            console.log('file', file)
                            // if (file !== undefined) {
                            //     blenderWriteForm.setFieldValue('file', file)
                            // }
                        }}
                        onReject={(files) => console.log('rejected files', files)}
                        maxSize={5 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                    />}
                    <Flex fz={16} fw={500} lh={'16px'} py={9}>칠러님의 한 잔에 대한 사진은 필수입니다.</Flex>
                </Flex>
                <Flex direction={'column'} w={'100%'}>
                    <Flex direction={'column'} gap={32} mb={32}>
                        <Input.Wrapper
                            label={<Flex>칠러님의 한 잔에 이름을 붙여주세요!</Flex>}
                            error={blenderWriteForm.errors.title}
                        >
                            <Input placeholder='한 잔 이름' {...blenderWriteForm.getInputProps('title')} />
                        </Input.Wrapper>
                        <Input.Wrapper
                            label={<Flex>한 잔을 한 줄 소개한다면?</Flex>}
                            error={blenderWriteForm.errors.description}
                        >
                            <Input placeholder='한 잔 소개하기' {...blenderWriteForm.getInputProps('description')} />
                        </Input.Wrapper>
                        <Input.Wrapper
                            label={<Flex>어떻게 만들면 되나요</Flex>}
                            error={blenderWriteForm.errors.content}
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
