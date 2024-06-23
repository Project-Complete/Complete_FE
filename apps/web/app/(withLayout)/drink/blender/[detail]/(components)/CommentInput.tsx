'use client';

import { Button, Flex, TextInput } from '@mantine/core';
import blenderClasses from '../../(component)/Blender.module.scss';
import { useForm } from '@mantine/form';
import { useCommentBlenderMutation } from '@/hooks/mutates/useBlenderMutate';

const CommentInput = ({
  initial = ``,
  isLogin,
  parentCommentId = 0,
  combinationsId,
}: {
  initial?: string;
  isLogin: boolean;
  parentCommentId?: number;
  combinationsId: number;
}) => {
  const { mutate, isPending } = useCommentBlenderMutation(combinationsId);
  const form = useForm({
    initialValues: {
      comment: initial,
    },
    validate: {
      comment: value => {
        if (value.length === 0 || value.trim().length === 0) {
          return '내용을 입력해주세요.';
        } else if (value.length > 250) {
          return '250자 이하로 입력해주세요.';
        } else {
          return null;
        }
      },
    },
  });
  console.log(form.errors);
  if (isPending) {
    return <div>로딩중</div>;
  }
  if (isLogin) {
    return (
      <form
        onSubmit={form.onSubmit(values => {
          form.validate();

          mutate(
            {
              combinationsId,
              content: values.comment,
              parentId: parentCommentId,
            },
            { onSuccess: () => form.setValues({ comment: '' }) },
          );
        })}
      >
        <Flex w={'100%'} gap={8}>
          <TextInput
            classNames={{
              input: blenderClasses['mantine-input'],
              wrapper: blenderClasses[`mantine-input-wrapper`],
            }}
            radius={8}
            w={'100%'}
            rightSectionWidth={'70'}
            rightSection={
              <Flex
                fz={14}
                fw={500}
                lh={'100%'}
                color={`#00000073`}
              >{`(${form.getValues().comment.length}/250)`}</Flex>
            }
            key={form.key(`comment`)}
            {...form.getInputProps(`comment`)}
            error={form.errors.comment}
          />
          <Button
            className={blenderClasses['mantine-button']}
            fz={16}
            fw={500}
            lh={'16px'}
            m={0}
            p={0}
            type={'submit'}
          >
            입력
          </Button>
        </Flex>
      </form>
    );
  } else {
    return null;
  }
};

export default CommentInput;
