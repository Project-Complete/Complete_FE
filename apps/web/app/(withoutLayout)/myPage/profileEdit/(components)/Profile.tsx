import { MyUserInfo } from '@/types/userInfo';
import { api } from '@/utils/api';
import { Avatar, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button } from '@team-complete/complete-ui';
import ky from 'ky';
import { useState } from 'react';
import { useProfilePatchMutate } from '@/hooks/mutates/useProfilePatchMutate';

import classes from './Profile.module.scss';
import { PreSignedUrlResponse } from '@/app/(withoutLayout)/drink/[detail]/review/write/(components)/ReviewWriteForm';
import { useRouter } from 'next/navigation';

const MyPageProfileEdit = ({ myInfoData }: { myInfoData: MyUserInfo }) => {
  const { mutate } = useProfilePatchMutate();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      nickname: myInfoData.nickname,
      email: myInfoData.email ? myInfoData.email : 'test@gmail.com',
      profile_image_url: myInfoData.profile_image_url,
    },
    validate: {
      nickname: value =>
        value.length > 10 || value.trim().length < 2
          ? '이름은 2자 이상 10자 이하여야 합니다.'
          : null,
    },
  });

  const [image, setImage] = useState<{
    file: File | null;
    src: string;
    isChange: boolean;
  }>({
    file: null,
    src: myInfoData.profile_image_url,
    isChange: false,
  });

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = event.target.files?.[0];
    if (file) {
      if (!image.file) {
        const reader = new FileReader();

        reader.onload = () => {
          setImage({
            file: file,
            src: reader.result as string,
            isChange: true,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const postImageName = async () => {
    try {
      const response: PreSignedUrlResponse = await api
        .post(`pre-signed-url`, {
          json: { file_name: image.file?.name },
        })
        .json();

      return response.pre_signed_url;
    } catch (error) {
      throw new Error('pre signed url 전송 실패');
    }
  };

  const postImage = async (storageUrl: string) => {
    try {
      const response = await ky.put(storageUrl, {
        body: image.file,
      });

      return response;
    } catch (error) {
      console.error('image post error', error);
      throw new Error('프로필 이미지 등록실패');
    }
  };

  const handleSubmit = async (values: any) => {
    event?.preventDefault();
    try {
      if (image.isChange) {
        const presignedUrlResponse = await postImageName();

        await postImage(presignedUrlResponse || '');
        mutate(
          {
            profile: {
              profile_image_url: presignedUrlResponse.split('?')[0]!,
              nickname: values.nickname,
              email: values.email,
            },
          },
          {
            onSuccess: () => {
              router.push('/myPage');
            },
          },
        );
      } else {
        mutate(
          {
            profile: values,
          },
          {
            onSuccess: () => {
              router.push('/myPage');
            },
          },
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error('리뷰 작성 실패');
    }
  };

  return (
    <Flex w={'100%'} justify={'center'}>
      <Flex maw={'50.5rem'} w={'100%'}>
        <form
          onSubmit={form.onSubmit(values => handleSubmit(values))}
          className={classes[`form-wrapper`]}
        >
          <section>
            <label className={classes['image-attach']} htmlFor='review-image'>
              사진 첨부하기
              <Avatar
                src={image.src}
                alt='no image here'
                w={'8.25rem'}
                h={'8.25rem'}
              ></Avatar>
            </label>
            <input
              className={classes[`image-input`]}
              id='review-image'
              type='file'
              accept='image/*'
              onChange={handleImage}
            />
          </section>
          <section>
            <label className={classes['image-attach']}>사용자 이름</label>
            <TextInput
              key={form.key('nickname')}
              {...form.getInputProps('nickname')}
              placeholder='이름을 입력해주세요'
              rightSection={<>{form.getValues().nickname.length}/10</>}
            ></TextInput>
          </section>
          <div className={classes['button-wrapper']}>
            <Button
              variant='outline'
              onClick={() => {
                form.setValues({
                  nickname: myInfoData.nickname,
                  email: myInfoData.email ? myInfoData.email : '',
                  profile_image_url: myInfoData.profile_image_url,
                });
                setImage({
                  file: null,
                  src: myInfoData.profile_image_url,
                  isChange: false,
                });
              }}
            >
              작성 취소
            </Button>
            <Button variant='primary' type={'submit'}>
              작성 완료
            </Button>
          </div>
        </form>
      </Flex>
    </Flex>
  );
};

export default MyPageProfileEdit;
