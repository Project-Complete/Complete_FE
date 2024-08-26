import { Divider, Flex, Popover, PopoverProps } from "@mantine/core";
import { Button, Input, CloseIconButton } from "@team-complete/complete-ui";
import { useCallback, useState } from "react";
import { produce } from "immer";

import Image from 'next/image';
import { useBlenderWriteFormContext } from "./blenderWriteFormContext";
import { useDrinkListQuery } from "@/hooks/queries/useDrinkListQuery";

type SearchDrinkPopoverPropsType = PopoverProps & {
    children: React.ReactNode
    handleClosePopover: () => void
    index: number;
}

const SearchDrinkPopover = ({ children, handleClosePopover, index, ...popoverProps }: SearchDrinkPopoverPropsType) => {

    // 주류 외 재료인데 뭐라 영어로 적지
    // const [isAddOtherIngredient, setIsAddOtherIngredient] = useState(false);

    const [selectedDrink, setSelectedDrink] = useState<{ drink_name: string, drink_id: number | null }>({
        drink_name: '',
        drink_id: null,
    });
    // const [volume, setVolume] = useState<string>('');
    const [keyword, setKeyword] = useState('');


    const [addOtherIngredient, setAddOtherIngredient] = useState({
        name: '',
        volume: '',
        isAddOtherIngredient: false,
    });

    const toggleIsAddOtherIngredient = useCallback(() => {
        setAddOtherIngredient(produce(draft => {
            draft.isAddOtherIngredient = !draft.isAddOtherIngredient;
        }));
    }, [])


    const blenderWriteForm = useBlenderWriteFormContext();

    const { data, fetchNextPage, hasNextPage } = useDrinkListQuery({
        keyword,
        drinkType: 'all'
    });

    const handleWriteComplete = () => {
        blenderWriteForm.setFieldValue('combinations', (combinations) => {
            const newCombination = [...combinations];
            const temp = newCombination[index];
            if (temp === undefined) return combinations;
            temp.drink_id = selectedDrink.drink_id;
            if (addOtherIngredient.isAddOtherIngredient) {
                temp.name = addOtherIngredient.name;
                temp.volume = addOtherIngredient.volume;
            }
            else {
                temp.name = selectedDrink.drink_name;
                temp.volume = addOtherIngredient.volume;
            }
            return newCombination;
        });
        handleClosePopover && handleClosePopover();

    }


    return <Popover
        {...popoverProps}

    >
        <Popover.Target>
            {children}
        </Popover.Target>
        <Popover.Dropdown
            onMouseMove={(e) => {
                e.stopPropagation();
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
        >
            {addOtherIngredient.isAddOtherIngredient
                ? <Flex direction={'column'} justify={'center'} align={'center'} gap={10}>
                    <Input placeholder="주류 외 재료를 입력해주세요." value={addOtherIngredient.name} onChange={(e) => {
                        setAddOtherIngredient(produce(draft => {
                            draft.name = e.target.value;
                        }));
                    }} rightSection={
                        <CloseIconButton w={8} h={8} onClick={() => {
                            setAddOtherIngredient(produce(draft => {
                                draft.name = ''
                            }));
                        }}></CloseIconButton>
                    } />
                    <Input placeholder="용량을 입력해주세요." value={addOtherIngredient.volume} onChange={(e) => {
                        setAddOtherIngredient(produce(draft => {
                            draft.volume = e.target.value;
                        }));
                    }} rightSection={
                        <CloseIconButton w={8} h={8} onClick={() => {
                            setAddOtherIngredient(produce(draft => {
                                draft.volume = ''
                            }));
                        }}></CloseIconButton>
                    } />
                    <Divider />
                    <Flex>
                        <Button onClick={toggleIsAddOtherIngredient}>취소</Button>
                        <Button onClick={handleWriteComplete}>작성 완료</Button>
                    </Flex>
                </Flex>
                : <Flex direction={'column'} gap={10}>
                    <Flex>
                        <Input placeholder="찾는 주류가 있으신가요?" onChange={e => setKeyword(e.target.value)} />
                        <Button >검색</Button>
                    </Flex>
                    <Divider />
                    <Flex justify={'center'} onClick={toggleIsAddOtherIngredient}> + 주류 외 재료 직접 등록</Flex>
                    {data?.pages?.map((page, index) => {
                        return (
                            <Flex direction={'column'} key={index}>
                                {page.drinks.map((drink, drinkIndex) => {
                                    return (
                                        <Flex justify={'space-between'} key={drinkIndex}>
                                            <Flex align={'center'} gap={20}>
                                                <Image
                                                    style={{ borderRadius: 4 }}
                                                    width={40}
                                                    height={40}
                                                    src={
                                                        drink.image_url === 'imageUrl'
                                                            ? 'https://picsum.photos/392/288.webp'
                                                            : drink.image_url
                                                    }
                                                    alt='주류 이미지'
                                                />
                                                <Flex direction={'column'}>
                                                    <Flex fs={'14px'} fw={400} lh={'16px'} c={'#00000045'}>{drink.manufacturer_name}</Flex>
                                                    <Flex fz={'16px'} fw={500} lh={'24px'}>{drink.drink_name}</Flex>
                                                </Flex>
                                            </Flex>
                                            <Button onClick={() => {
                                                setSelectedDrink({ drink_id: drink.drink_id, drink_name: drink.drink_name });
                                                toggleIsAddOtherIngredient();
                                            }}>선택</Button>
                                        </Flex>
                                    );
                                })}
                            </Flex>
                        );
                    })}
                </Flex>
            }
        </Popover.Dropdown >
    </Popover >
}
export default SearchDrinkPopover;