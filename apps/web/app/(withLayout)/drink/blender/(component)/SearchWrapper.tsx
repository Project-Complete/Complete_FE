'use client';

import {
  Box,
  Divider,
  Drawer,
  Flex,
  Menu,
  MenuDropdown,
  MenuTarget,
  ScrollArea,
  Text,
  TextInput,
  UnstyledButton,
  em,
} from '@mantine/core';
import { useDisclosure, useIntersection, useMediaQuery } from '@mantine/hooks';
import { ChipButton, Button } from '@team-complete/complete-ui';
import { usePathname, useRouter } from 'next/navigation';
import classes from './List.module.scss';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDrinkListQuery } from '@/hooks/queries/useDrinkListQuery';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

const BlenderListSearchWrapper = ({
  setDrinkId,
}: {
  setDrinkId: Dispatch<SetStateAction<number | undefined>>;
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width:${em(768)})`);
  const [search, setSearch] = useState<string>(``);
  const { data, hasNextPage, fetchNextPage, refetch } = useDrinkListQuery({
    drinkType: 'all',
    keyword: search,
  });
  const [open, setOpen] = useState(false);
  const [opened, { open: drawerOpen, close }] = useDisclosure(false);

  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.3,
  });

  useEffect(() => {
    refetch();
  }, [search]);
  useEffect(() => {
    if (entry && entry.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);
  return (
    <Box>
      {isMobile ? (
        <>
          <Drawer
            opened={opened}
            onClose={close}
            position='bottom'
            size={`80%`}
            withCloseButton={false}

            // scrollAreaComponent={ScrollArea.Autosize}
          >
            <Flex p={`0.5rem`}>
              <TextInput
                w={`100%`}
                placeholder='찾는 주류가 있으신가요?'
                value={search}
                onChange={e => setSearch(e.target.value)}
                rightSection={
                  search && (
                    <UnstyledButton
                      onClick={() => {
                        setSearch(``);
                      }}
                    >
                      <Flex align={`center`}>
                        <Image
                          src={`/icons/닫기.svg`}
                          alt={'닫기'}
                          width={24}
                          height={24}
                        />
                      </Flex>
                    </UnstyledButton>
                  )
                }
              ></TextInput>
              <UnstyledButton
                w={60}
                h={40}
                ml={`0.5rem`}
                className={classes.textInput}
                onClick={() => {
                  refetch();
                }}
              >
                검색
              </UnstyledButton>
            </Flex>
            <Divider />
            <Flex direction={`column`}>
              {data &&
                data.pages &&
                data.pages.map((e, i) => (
                  <Flex direction='column' key={i}>
                    {e.drinks.map(element => (
                      <Flex key={element.drink_id} p={`0.5rem`}>
                        <Box w={40} h={40}>
                          <Image
                            width={40}
                            height={40}
                            sizes={`width:40px; height:40px;`}
                            src={
                              element.image_url !== 'string' &&
                              element.image_url !== '' &&
                              element.image_url !== 'imageUrl' &&
                              element.image_url !== '테스트 url'
                                ? element.image_url
                                : 'https://picsum.photos/392/288.webp'
                            }
                            alt={`drink image`}
                          />
                        </Box>
                        <Flex ml={`0.5rem`} direction={`column`} w={`100%`}>
                          <Text
                            fz={`14px`}
                            fw={400}
                            color={`#00000073`}
                            h={16}
                            lh={`16px`}
                          >
                            {element.manufacturer_name}
                          </Text>
                          <Text fz={`16px`} fw={500} lh={`24px`} h={24}>
                            {element.drink_name}
                          </Text>
                        </Flex>

                        <Button
                          variant='outline'
                          color={`gray`}
                          className={classes.button}
                          onClick={() => {
                            router.replace(
                              `/drink/blender?page=1&drinkId=${element.drink_id}`,
                            );
                            setDrinkId(element.drink_id);
                            close();
                          }}
                        >
                          선택
                        </Button>
                      </Flex>
                    ))}
                  </Flex>
                ))}
            </Flex>
            <div ref={ref}></div>
          </Drawer>
          <ChipButton
            className={classes.chipButton}
            variant={`gray`}
            onClick={drawerOpen}
          >
            원하는 주류로 검색하기
          </ChipButton>
        </>
      ) : (
        <Menu opened={open} onChange={setOpen}>
          <MenuTarget>
            <ChipButton className={classes.chipButton} variant={`primary`}>
              원하는 주류로 검색하기
            </ChipButton>
          </MenuTarget>
          <MenuDropdown w={600}>
            <Flex p={`0.5rem`}>
              <TextInput
                w={`100%`}
                placeholder='찾는 주류가 있으신가요?'
                value={search}
                onChange={e => setSearch(e.target.value)}
                rightSection={
                  search && (
                    <UnstyledButton
                      onClick={() => {
                        setSearch(``);
                      }}
                    >
                      <Flex align={`center`}>
                        <Image
                          src={`/icons/닫기.svg`}
                          alt={'닫기'}
                          width={24}
                          height={24}
                        />
                      </Flex>
                    </UnstyledButton>
                  )
                }
              ></TextInput>
              <UnstyledButton
                w={60}
                h={40}
                ml={`0.5rem`}
                className={classes.textInput}
                onClick={() => {
                  refetch();
                }}
              >
                검색
              </UnstyledButton>
            </Flex>
            <Menu.Divider />
            <Flex direction={`column`}>
              {data &&
                data.pages &&
                data.pages.map((e, i) => (
                  <Flex direction='column' key={i}>
                    {e.drinks.map(element => (
                      <Flex key={element.drink_id} p={`0.5rem`}>
                        <Box w={40} h={40}>
                          <Image
                            width={40}
                            height={40}
                            sizes={`width:40px; height:40px;`}
                            src={
                              element.image_url !== 'string' &&
                              element.image_url !== '' &&
                              element.image_url !== 'imageUrl' &&
                              element.image_url !== '테스트 url'
                                ? element.image_url
                                : 'https://picsum.photos/392/288.webp'
                            }
                            alt={`drink image`}
                          />
                        </Box>
                        <Flex ml={`0.5rem`} direction={`column`} w={`100%`}>
                          <Text
                            fz={`14px`}
                            fw={400}
                            color={`#00000073`}
                            h={16}
                            lh={`16px`}
                          >
                            {element.manufacturer_name}
                          </Text>
                          <Text fz={`16px`} fw={500} lh={`24px`} h={24}>
                            {element.drink_name}
                          </Text>
                        </Flex>

                        <Button
                          variant='outline'
                          color={`gray`}
                          className={classes.button}
                          onClick={() => {
                            router.replace(
                              `/drink/blender?page=1&drinkId=${element.drink_id}`,
                            );
                            setDrinkId(element.drink_id);
                            setOpen(false);
                          }}
                        >
                          선택
                        </Button>
                      </Flex>
                    ))}
                  </Flex>
                ))}
            </Flex>
            <div ref={ref}></div>
          </MenuDropdown>
        </Menu>
      )}
    </Box>
  );
};

export default BlenderListSearchWrapper;
