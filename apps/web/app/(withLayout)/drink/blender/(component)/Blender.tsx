'use client';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Menu,
  ScrollArea,
  Text,
  UnstyledButton,
} from '@mantine/core';
import Image from 'next/image';

import { useBlenderDetailQuery } from '@/hooks/queries/blenders/useBlenderDetailQuery';
import { useParams } from 'next/navigation';
import { formattedDate } from '@/utils/formattedDate';
import { Fragment } from 'react';
import BlenderDrinkListCard from './DrinkList';
import Point from '@/assets/Point';
import { useDeleteBlenderMutation } from '@/hooks/mutates/useBlenderMutate';
import BlenderLikeButton from '@/components/button/BlenderLikeButton';
import BlenderBookmarkButton from '@/components/button/BlenderBookmarkButton';
import { Chip } from '@team-complete/complete-ui';
import CommentWrapper from '../[detail]/(components)/CommentWrapper';

const Blender = () => {
  const detailId = useParams<{ detail: string }>()!;
  const { data } = useBlenderDetailQuery({
    detailId: parseInt(detailId?.detail),
  });
  // console.log(data);
  const { mutate: deleteMutate } = useDeleteBlenderMutation();
  if (data) {
    return (
      <Flex maw={600} w={`100%`} direction={'column'} gap={12}>
        <Flex w={'100%'} h={600} bg={'#D9D9D9'}>
          빈 그림
        </Flex>
        <Flex direction={'column'} gap={12} my={12}>
          <Flex fz={18} fw={800} lh={'40px'}>
            {data.title}
          </Flex>
          <Flex align={'center'} gap={12} w={'100%'}>
            <Avatar size={40} radius={'100%'} src={data.profile_image_url} />
            <Flex direction={'column'} w={'100%'} gap={4}>
              <Flex fz={14} fw={400} lh={'16px'}>
                {data.nickname}
              </Flex>
              <Flex fz={14} fw={400} lh={'16px'}>
                {formattedDate(data.created_date)}
              </Flex>
            </Flex>
            <Flex w={24} h={'100%'}>
              <Menu position='bottom-end'>
                <Menu.Target>
                  <UnstyledButton>
                    <Image
                      src={'/icons/더보기.svg'}
                      width={24}
                      height={24}
                      alt={'더보기'}
                    />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown w={'11.6rem'}>
                  <Menu.Item
                    fw={'1rem'}
                    lh={'1rem'}
                    px={'6px'}
                    py={'12px'}
                    color={'rgba(0, 0, 0, 0.65)'}
                  >
                    수정하기
                  </Menu.Item>
                  <Menu.Item
                    fw={'1rem'}
                    lh={'1rem'}
                    px={'6px'}
                    py={'12px'}
                    color={'rgba(0, 0, 0, 0.65)'}
                    onClick={() => {
                      deleteMutate({
                        combinationsId: data.combination_board_id,
                      });
                    }}
                  >
                    삭제하기
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Flex>
          <Flex fz={16} fw={400} lh={'24px'}>
            {data.description}
          </Flex>
          <Flex align={'center'} justify={'flex-end'} gap={12}>
            <Flex align={'center'}>
              <BlenderLikeButton
                combinationsId={data.combination_board_id}
                isLike={data.combination_like}
              />
              {data.combination_like_count}
            </Flex>
            <Flex align={'center'}>
              <BlenderBookmarkButton
                combinationsId={data.combination_board_id}
                isBookmark={data.combination_bookmark}
              />
              {data.combination_bookmark_count}
            </Flex>
          </Flex>
        </Flex>
        <Divider my={24} />
        <Flex p={24} gap={12} mb={24} direction={'column'}>
          <Flex fz={18} fw={500} lh={'24px'} gap={'0.5rem'} align='center'>
            <Point />
            만드는 방법
          </Flex>
          <Flex fz={16} fw={400} lh={'24px'}>
            {data.content}
          </Flex>
        </Flex>
        <Flex direction={'column'}>
          <Flex
            fz={18}
            fw={500}
            lh={'24px'}
            mb={12}
            align={'center'}
            gap={'0.5rem'}
          >
            <Point /> 사용 재료
          </Flex>
          <ScrollArea w={`100%`} h={`100%`} scrollbars='x'>
            <Flex mb={`12px`} gap={24}>
              {data.combinations.map((e, i) => (
                <Fragment key={i}>
                  <BlenderDrinkListCard
                    drink_id={e.drink_id}
                    drink_like={e.drink_like}
                    drink_name={e.name}
                    image_url={e.image_url}
                    manufacturer_name={e.manufacturer_name}
                    volume={e.volume}
                  />
                </Fragment>
              ))}
            </Flex>
          </ScrollArea>
          <Box mt={`0.5rem`} mb={`1.5rem`} w={`100%`} h={`100%`}>
            <Text fw={500} fs={`1.125rem`} lh={`1.5rem`}>
              + 기타 재료
            </Text>
            <ScrollArea w={`100%`} h={`3rem`} scrollbars='x'>
              <Flex gap={`0.5rem`} w={`100%`}>
                {data.etc_combinations.map(e => (
                  <Chip key={e.name} variant={'ghost'}>
                    <Flex h={'100%'} align={'center'}>
                      {e.name}{' '}
                      <Box h={`100%`} py={`0.3rem`}>
                        <Divider
                          orientation='vertical'
                          h={`100%`}
                          mx={`1.25rem`}
                        />
                      </Box>
                      {e.volume}
                    </Flex>
                  </Chip>
                ))}
              </Flex>
            </ScrollArea>
          </Box>
          <Divider mb={`1.25rem`} />
          {detailId && <CommentWrapper detailId={parseInt(detailId.detail)} />}
        </Flex>
      </Flex>
    );
  } else {
    return null;
  }
};
export default Blender;
