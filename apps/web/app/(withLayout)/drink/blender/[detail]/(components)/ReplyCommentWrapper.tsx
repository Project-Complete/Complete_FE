'use client';

import { useBlenderReplyCommentInfiniteQuery } from '@/hooks/queries/blenders/useBlenderDetailQuery';
import { timeAgo } from '@/utils/formattedDate';
import { Accordion, Avatar, Flex, Text, UnstyledButton } from '@mantine/core';
import classes from './CommentWrapper.module.scss';

const ReplyCommentWrapper = ({
  combinationId,
  replyCount,
}: {
  combinationId: number;
  replyCount: number;
}) => {
  const { data, fetchNextPage, hasNextPage } =
    useBlenderReplyCommentInfiniteQuery({ combinationsId: combinationId });
  console.log('reply comment data', data);
  return (
    <div>
      <Accordion
        chevronPosition='left'
        classNames={{
          label: classes.replyWrapper,
          item: classes.replyItemLine,
          content: classes.replyItemLine,
        }}
      >
        <Accordion.Item key={combinationId} value={'답글' + replyCount + '개'}>
          <Accordion.Control>{'답글' + replyCount + '개'}</Accordion.Control>
          <Accordion.Panel>
            {data &&
              data.pages.map(page => {
                return page.combination_comments.map(comment => {
                  return (
                    <Flex
                      key={comment.id}
                      ml={32}
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
                    </Flex>
                  );
                });
              })}
            {hasNextPage && (
              <UnstyledButton
                ml={32}
                onClick={async () => {
                  fetchNextPage();
                }}
                className={classes.replyWrapper}
              >
                더보기 {`>`}
              </UnstyledButton>
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ReplyCommentWrapper;
