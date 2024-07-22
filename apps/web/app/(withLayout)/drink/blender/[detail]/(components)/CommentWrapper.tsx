'use client';
import {
  Avatar,
  Button,
  Flex,
  Menu,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';

import { useBlenderCommentInfiniteQuery } from '@/hooks/queries/blenders/useBlenderDetailQuery';
import { useIntersection } from '@mantine/hooks';
import { Fragment, useEffect, useState } from 'react';
import { timeAgo } from '@/utils/formattedDate';

import ReplyCommentWrapper from './ReplyCommentWrapper';
import CommentInput from './CommentInput';

import Cookies from 'js-cookie';
import Image from 'next/image';
import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';
import { ChipButton } from '@team-complete/complete-ui';

import classes from './CommentWrapper.module.scss';
import { useCommentBlenderDelete } from '@/hooks/mutates/useBlenderMutate';

const CommentWrapper = ({ detailId }: { detailId: number }) => {
  const isLogin = Cookies.get('access_token') ? true : false;
  const { data: myInfoData } = useMyInfoQuery();
  const { data, fetchNextPage, hasNextPage } = useBlenderCommentInfiniteQuery({
    detailId,
  });
  const { mutate: deleteComment, isPending } =
    useCommentBlenderDelete(detailId);
  const [reply, setReply] = useState<boolean[]>([]);
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.3,
  });

  useEffect(() => {
    if (entry && entry.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);
  useEffect(() => {
    if (data && data.pages[0] && data.pages[0]?.page_info.total_elements) {
      const initial = new Array(data.pages[0].page_info.total_elements).fill(
        false,
      );
      setReply([...initial]);
    }
  }, [data]);

  if (data) {
    return (
      <>
        <Flex fz={16} fw={500} lh={'24px'} mb={24}>
          {' '}
          댓글 {data && data.pages[0] && data.pages[0].page_info.total_elements}
          개
        </Flex>
        <Flex gap={20} direction={'column'} w={'100%'}>
          <CommentInput
            initial={''}
            isLogin={isLogin}
            combinationsId={detailId}
          />
          {data.pages.map((e, i) => (
            <Fragment key={i}>
              {e.combination_comments.map((comment, index) => (
                <Flex
                  key={index}
                  direction={'column'}
                  gap={4}
                  justify={'center'}
                >
                  <Flex gap={12} justify={'center'} align={'center'}>
                    <Avatar size={24} radius={'100%'} src={''} />
                    <Flex w={'100%'} direction={'column'}>
                      <Flex fz={16} fw={500} lh={'24px'}>
                        {comment.nickname}
                      </Flex>
                      <Text
                        fz={12}
                        fw={500}
                        lh={'16px'}
                        color={`rgba(0, 0, 0, 0.45)`}
                      >
                        {timeAgo(comment.created_date)}
                      </Text>
                    </Flex>
                    {isLogin && (
                      <ChipButton
                        variant={`primary`}
                        className={classes.replyButton}
                        onClick={() => {
                          const prev = [...reply];
                          prev[index] = !prev[index];
                          setReply([...prev]);
                        }}
                      >
                        댓글
                      </ChipButton>
                    )}
                    <Flex>
                      {myInfoData && myInfoData.user_id === comment.user_id && (
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
                            {/* <Menu.Item
                              fw={'1rem'}
                              lh={'1rem'}
                              px={'6px'}
                              py={'12px'}
                              color={'rgba(0, 0, 0, 0.65)'}
                            >
                              수정하기
                            </Menu.Item> */}
                            <Menu.Item
                              fw={'1rem'}
                              lh={'1rem'}
                              px={'6px'}
                              py={'12px'}
                              color={'rgba(0, 0, 0, 0.65)'}
                              onClick={() => {
                                deleteComment({
                                  commentId: comment.combination_comment_id,
                                });
                              }}
                            >
                              삭제하기
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      )}
                    </Flex>
                  </Flex>
                  <Flex fz={16} fw={400} lh={'24px'} ml={`2.25rem`}>
                    {comment.content}
                  </Flex>
                  {comment.reply_count > 0 && (
                    <ReplyCommentWrapper
                      combinationId={comment.combination_comment_id}
                      replyCount={comment.reply_count}
                      myInfoData={myInfoData}
                    />
                  )}
                  <>
                    {reply[index] && (
                      <CommentInput
                        initial={''}
                        isLogin={isLogin}
                        combinationsId={detailId}
                        parentCommentId={comment.combination_comment_id}
                      />
                    )}
                  </>
                </Flex>
              ))}
            </Fragment>
          ))}
        </Flex>
        <div ref={ref}></div>
      </>
    );
  } else {
    return null;
  }
};

export default CommentWrapper;
