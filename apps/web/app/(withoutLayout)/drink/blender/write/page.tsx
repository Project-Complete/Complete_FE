'use client'
import { Flex, Box, Divider, Input, Image as MantineImage, Popover } from '@mantine/core';
import { Button } from '@team-complete/complete-ui';
import containerCss from './container.module.scss';
import LoginButton from '@/components/login/LoginButton';
import Image from 'next/image';
import camera from '@/assets/icons/카메라.svg';
import CustomDropZone from './(components)/CustomDropZone';
import { Form, useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useCallback, useRef, useState } from 'react';
import { IconCirclePlus } from '@tabler/icons-react';
import { randomId } from '@mantine/hooks';
import SearchDrinkPopover from './(components)/SearchDrinkPopover';
import { blenderWriteFormInitialValues, blenderWriteFormInitialValuesTypes, BlenderWriteFormProvider, useCreateBlenderWriteForm } from './(components)/blenderWriteFormContext';
import { useMutation } from '@tanstack/react-query';
import useCreateCombinationMutate from '@/hooks/mutates/useCreateCombinationMutate';
import postPreSignedUrl from '@/lib/postPreSignedUrl';


export default function Page(): JSX.Element {
    const blenderWriteForm = useCreateBlenderWriteForm();
    const [selectedCombinationId, setSelectedCombinationId] = useState<string | null>(null);
    const [selectedCombinationPopover, setSelectedCombinationPopover] = useState<string | null>(null);

    const file = blenderWriteForm.getValues().file;
    const imageUrl = file ? URL.createObjectURL(file) : null;

    const handleClosePopover = useCallback(() => {
        setSelectedCombinationPopover(null);
    }, [])

    const handleAddCombination = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        e.preventDefault();
        // 이미지를 클릭하는 경우 combination 을 추가한다.
        if (selectedCombinationId !== null) return;
        if (selectedCombinationPopover !== null) {
            console.log("")
            setSelectedCombinationPopover(null);
            return;
        }
        const { clientX, clientY } = e;
        const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
        const xcoordinate = (clientX - left) / width * 100;
        const ycoordinate = (clientY - top) / height * 100;
        const id = randomId()
        blenderWriteForm.setFieldValue('combinations', [...blenderWriteForm.getValues().combinations, { id, name: '', volume: '', xcoordinate, ycoordinate }]);
        setSelectedCombinationPopover(id);
    }

    const imageRef = useRef<HTMLDivElement | null>(null);

    const handleOnMouseDownSelectCombination = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        // combination 을 선택하는 경우 해당 combination 의 id 를 저장한다.
        const combinationId = e.currentTarget.dataset.combinationId;
        combinationId && setSelectedCombinationId(combinationId);
        combinationId && setSelectedCombinationPopover(combinationId);
    }

    const getInnerCoodinateMaxMin = (value: number, max: number, min: number): number => {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }

    const handleOnMouseMoveMoveCombination = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        // 선택된 combination 을 이동한다.
        // style로 x,y 좌표를 변경하여 렌더링 최적화를 하였음.
        const element = e.currentTarget.querySelector(`[data-combination-id="${selectedCombinationId}"]`) as HTMLDivElement | null;
        if (element && selectedCombinationId && imageRef.current) {
            const { clientX, clientY } = e;
            const wrappingElementSize = imageRef.current.getBoundingClientRect();
            const combinationElementSize = element?.getBoundingClientRect().width / 2;
            const xcoordinate = getInnerCoodinateMaxMin(clientX - wrappingElementSize.left, wrappingElementSize.width - combinationElementSize, combinationElementSize) / wrappingElementSize.width;
            const ycoordinate = getInnerCoodinateMaxMin(clientY - wrappingElementSize.top, wrappingElementSize.height - combinationElementSize, combinationElementSize) / wrappingElementSize.height;
            element.style.left = `${xcoordinate * 100}%`;
            element.style.top = `${ycoordinate * 100}%`;
        }
    }

    const handleOnMouseUpUnselectCombination = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        // 마지막에 저장된 위치를 속성 값에서 가져와서 form 에 갱신한다.

        let isChanged = false;
        const updatedCombinations = blenderWriteForm.getValues().combinations.map((combination) => {
            if (combination.id === selectedCombinationId) {
                isChanged = true;
                const element = e.currentTarget.querySelector(`[data-combination-id="${selectedCombinationId}"]`) as HTMLDivElement | null;
                if (element) {
                    const xcoordinate = element.style.left;
                    const ycoordinate = element.style.top;
                    console.log("xcoordinate", xcoordinate, "ycoordinate", ycoordinate)
                    return {
                        ...combination,
                        xcoordinate: parseFloat(xcoordinate),
                        ycoordinate: parseFloat(ycoordinate)
                    }
                }
            }
            return combination;
        })
        if (isChanged === false) return;
        blenderWriteForm.setFieldValue('combinations', updatedCombinations);
        // 선택된 combination 을 초기화한다.
        setSelectedCombinationId(null);

    }

    const { mutate } = useCreateCombinationMutate({
        formReset: () => {
            blenderWriteForm.reset();
        }
    });

    const handleWriteCancel = () => {
        history.back();
        blenderWriteForm.reset();
    }
    const handleWriteComplete = async () => {
        const file = blenderWriteForm.getValues().file;
        if (file === null) return;
        const image_url = await postPreSignedUrl(file);

        mutate(
            {
                image_url,
                title: blenderWriteForm.getValues().title,
                description: blenderWriteForm.getValues().description,
                content: blenderWriteForm.getValues().content,
                combinations: blenderWriteForm.getValues().combinations.map((v, index) => {
                    return {
                        drink_id: index + 1,
                        name: v.name,
                        volume: v.volume,
                        xcoordinate: v.xcoordinate,
                        ycoordinate: v.ycoordinate,
                    }
                })
            }
        )
    }
    const handleDeleteCombination = (index: number) => {
        blenderWriteForm.setFieldValue('combinations', (combinations) => {
            const newCombination = [...combinations];
            newCombination.splice(index, 1);
            return newCombination;
        });
    }

    return <BlenderWriteFormProvider form={blenderWriteForm}>

        <form onSubmit={blenderWriteForm.onSubmit(console.log)}
        >
            <Flex classNames={containerCss} direction={'column'}
                onMouseMove={handleOnMouseMoveMoveCombination}
                onMouseUp={handleOnMouseUpUnselectCombination}>
                <Flex py={24} gap={12} align={'center'} w={'100%'}>
                    <Flex fz={24} fw={800} lh={'40px'}>한잔 말아먹기</Flex>
                    <Divider orientation="vertical" h={16} style={{ alignSelf: 'center' }} />
                    <Flex fz={18} fw={500} lh={"24px"} >칠러님의 한 잔을 소개해주세요!</Flex>
                </Flex >
                <Divider />
                <Flex className={containerCss['responsive']} gap={32} w={'100%'} draggable={false}>
                    <Flex direction={'column'} c={'#00000073'} draggable={false}>
                        {blenderWriteForm.getValues().file ? <Flex ref={imageRef} bg={'#E5E6E8'} pos={'relative'} justify={'center'} align={'center'} gap={16} onMouseDown={handleAddCombination} draggable={false}>
                            {imageUrl && <>
                                <MantineImage fit="cover" w={384} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} style={{ pointerEvents: 'none', userSelect: 'none' }}
                                />
                                {blenderWriteForm.getValues().combinations.map((combination, index) => {
                                    return <SearchDrinkPopover width={'auto'} key={index}
                                        handleClosePopover={handleClosePopover}
                                        index={index}
                                        opened={combination.id === selectedCombinationPopover}
                                        position="bottom"
                                        offset={0}
                                        trapFocus
                                        withArrow>
                                        <Flex
                                            data-combination-id={combination.id}
                                            pos={'absolute'}
                                            w={16}
                                            h={16}
                                            style={{
                                                pointerEvents: 'all',
                                                mouse: 'grab',
                                                top: combination.ycoordinate + '%',
                                                left: combination.xcoordinate + '%',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                            onMouseDown={handleOnMouseDownSelectCombination}
                                        >
                                            <IconCirclePlus stroke={2} width={16} height={16} color={'#956faf'} />
                                        </Flex>
                                    </SearchDrinkPopover>
                                })}
                            </>}
                        </Flex> : <CustomDropZone
                            onDrop={(files) => {
                                console.log('accepted files', files)
                                const file = files?.[0] as File;
                                console.log('file', file)
                                if (file !== undefined) {
                                    blenderWriteForm.setFieldValue('file', file)
                                }
                            }}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={5 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                        />}
                        {blenderWriteForm.errors.file && <Flex fz={16} fw={500} lh={'16px'} py={9} c={'red'}>{blenderWriteForm.errors.file}</Flex>}
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
                        {blenderWriteForm.getValues().combinations.length > 0
                            && <Flex direction={'column'} gap={12} w={'100%'}>
                                <Flex>한 잔을 위한 재료</Flex>
                                {blenderWriteForm.getValues().combinations.map((combination, index) => {
                                    return < Flex gap={16} key={index}>
                                        <Input.Wrapper
                                            w={'100%'}
                                            label={index === 0 ? <Flex h={20} mb={8}>재료</Flex> : null}
                                        >
                                            <Input placeholder='ex) 소주'  {...blenderWriteForm.getInputProps(`combinations.${index}.name`)} />
                                        </Input.Wrapper>
                                        <Input.Wrapper
                                            w={'100%'}
                                            label={index === 0 ? <Flex h={20} mb={8}>용량</Flex> : null}
                                        >
                                            <Input placeholder='ex) 소주 잔의 반'  {...blenderWriteForm.getInputProps(`combinations.${index}.volume`)} />
                                        </Input.Wrapper>
                                        <Flex direction={'column'}>
                                            {index === 0 ? <Flex h={20} mb={8}></Flex> : null}
                                            <Button bg={'white'} onClick={() => handleDeleteCombination(index)} >
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
                        }
                    </Flex>
                </Flex >
                <Flex>
                    <Button size="md" variant="primary" onClick={handleWriteCancel}>작성 취소</Button>
                    <Button size="md" variant="primary" onClick={handleWriteComplete} >작성 완료</Button>
                </Flex>
            </Flex >
        </form>
    </BlenderWriteFormProvider>
}
