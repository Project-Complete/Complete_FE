'use client';
import { Avatar, Button, Flex, Text, TextInput } from '@mantine/core';

import { useBlenderCommentInfiniteQuery } from '@/hooks/queries/blenders/useBlenderDetailQuery';
import { useIntersection } from '@mantine/hooks';
import { Fragment, useEffect } from 'react';
import { timeAgo } from '@/utils/formattedDate';

import ReplyCommentWrapper from './ReplyCommentWrapper';
import CommentInput from './CommentInput';

import Cookies from 'js-cookie';

const CommentWrapper = ({ detailId }: { detailId: number }) => {
  const isLogin = Cookies.get('access_token') ? true : false;
  const { data, fetchNextPage, hasNextPage } = useBlenderCommentInfiniteQuery({
    detailId,
  });
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.3,
  });
  useEffect(() => {
    if (entry && entry.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);
  console.log(data);
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
                  </Flex>
                  <Flex fz={16} fw={400} lh={'24px'}>
                    {comment.content}
                  </Flex>
                  {comment.reply_count > 0 && (
                    <ReplyCommentWrapper
                      combinationId={comment.combination_comment_id}
                      replyCount={comment.reply_count}
                    />
                  )}
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
