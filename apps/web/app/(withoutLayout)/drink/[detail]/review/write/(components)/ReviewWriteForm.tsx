'use client';
import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import classes from './ReviewWriteForm.module.scss';
import Image from 'next/image';
import HelpMessageButton from './HelpMessageButton';
import { Divider, Flex, Rating, Textarea } from '@mantine/core';
import SituationButton from './SituationButton';
import FoodButton from './FoodButton';
import { FormValues, ReviewFormProvider, useReviewForm } from './form-context';
import TasteInput from './TasteInput';
import { Button } from '@team-complete/complete-ui';
import { api } from '@/utils/api';
import Link from 'next/link';
import {
  useReviewPictureUpload,
  useReviewWriteMutate,
} from '@/hooks/mutates/useReviewWriteMutate';
import { useRouter } from 'next/navigation';

export interface Situation {
  alone: boolean;
  friend: boolean;
  partner: boolean;
  business: boolean;
  adult: boolean;
}

export type SituationItemsValueType = keyof Situation;

export type SituationItemsLabelType =
  | '나 혼자'
  | '친구'
  | '연인'
  | '비즈니스'
  | '웃어른';

interface SituationItems {
  value: SituationItemsValueType;
  label: SituationItemsLabelType;
}

export interface PreSignedUrlResponse {
  pre_signed_url: string;
}

const situationItems: SituationItems[] = [
  { value: 'alone', label: '나 혼자' },
  { value: 'friend', label: '친구' },
  { value: 'partner', label: '연인' },
  { value: 'business', label: '비즈니스' },
  { value: 'adult', label: '웃어른' },
];

const flavorItems = [
  { value: 1, label: '과일' },
  { value: 2, label: '견과류' },
  { value: 3, label: '곡물' },
  { value: 4, label: '꽃' },
  { value: 5, label: '달콤' },
  { value: 6, label: '발효' },
  { value: 7, label: '식물' },
  { value: 8, label: '유제품' },
  { value: 9, label: '향신료' },
  { value: 10, label: '기타' },
];

const foodItems = [
  { value: 1, label: '가공육' },
  { value: 2, label: '견과류' },
  { value: 3, label: '과일' },
  { value: 4, label: '마른 안주' },
  { value: 5, label: '매운 음식' },
  { value: 6, label: '스낵' },
  { value: 7, label: '양식' },
  { value: 8, label: '육류' },
  { value: 9, label: '치즈' },
  { value: 10, label: '탕' },
  { value: 11, label: '튀김' },
  { value: 12, label: '해산물' },
];

// 탄산이고 레몬맛이라서 상큼합니다! 도수가 낮아서 음료처럼 가볍게 마시기 좋아요~!!
const ReviewWriteForm = ({ drinkId }: { drinkId: string }) => {
  const router = useRouter();

  const { mutate: reviewWriteMutate } = useReviewWriteMutate({
    detailId: parseInt(drinkId),
  });
  const { mutate: pictureUploadMutate } = useReviewPictureUpload();

  const form = useReviewForm({
    initialValues: {
      drinkId: drinkId,
      content: '',
      rating: 0,
      situation_dto: {
        alone: false,
        friend: false,
        partner: false,
        business: false,
        adult: false,
      },
      taste_dto: {
        sweet: 0,
        sour: 0,
        bitter: 0,
        body: 0,
        refresh: 0,
      },
      image_url: '',
      flavors: Array.from({ length: foodItems.length }, () => false),
      foods: Array.from({ length: foodItems.length }, () => false),
    },
    validate: {
      content: value =>
        value.trim().length < 20 || value.length > 250
          ? '리뷰는 20자 이상 250자 이하여야 합니다.'
          : null,
      situation_dto: value => {
        let trues = 0;
        if (value.adult) {
          trues++;
        }
        if (value.alone) {
          trues++;
        }
        if (value.business) {
          trues++;
        }
        if (value.friend) {
          trues++;
        }
        if (value.partner) {
          trues++;
        }

        return trues > 3 || trues < 1
          ? '1개 이상, 3개 이하로 선택해주세요.'
          : null;
      },
    },
    transformValues: values => ({
      ...values,
      flavors: values.flavors.reduce((acc, cur, idx) => {
        if (cur) {
          acc.push(idx + 1);
        }
        return acc;
      }, [] as number[]),
      foods: values.foods.reduce((acc, cur, idx) => {
        if (cur) {
          acc.push(idx + 1);
        }
        return acc;
      }, [] as number[]),
    }),
  });

  const [image, setImage] = useState<{ file: File | null; src: string }>({
    file: null,
    src: '',
  });

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage({ file: file, src: reader.result as string });
      };
      reader.readAsDataURL(file);
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
    pictureUploadMutate({ storageUrl, image });
  };

  const handleSubmit = async (values: FormValues) => {
    event?.preventDefault();
    try {
      const presignedUrlResponse = await postImageName();

      await postImage(presignedUrlResponse || '');

      reviewWriteMutate(
        {
          review: {
            ...values,
            image_url: presignedUrlResponse.split('?')[0] as string,
          },
        },
        {
          onSuccess: () => {
            router.push(`/drink/${drinkId}`);
          },
        },
      );
    } catch (error) {
      console.error(error);
      alert('리뷰 작성 실패');
      throw new Error('리뷰 작성 실패');
    }
  };
  return (
    <ReviewFormProvider form={form}>
      <form
        className={classes['form']}
        onSubmit={form.onSubmit(values => {
          handleSubmit(values);
        })}
      >
        <section className={classes['image-section']}>
          {image.src && (
            <div className={classes['image-wrapper']}>
              <div>
                <Image src={image.src} alt='thumbnail' fill />
                <label htmlFor='review-image'>사진 변경</label>
                <input
                  id='review-image'
                  type='file'
                  accept='image/*'
                  onChange={handleImage}
                  onClick={event => {
                    event.currentTarget.value = '';
                  }}
                />
              </div>
            </div>
          )}
          <SectionHeader title='인증샷' dot={false} />
          {!image.src && (
            <>
              <label className={classes['image-attach']} htmlFor='review-image'>
                사진 첨부하기
                <Image
                  src={'/icons/카메라.svg'}
                  alt='camera'
                  height={24}
                  width={24}
                />
              </label>
              <input
                id='review-image'
                type='file'
                accept='image/*'
                onChange={handleImage}
              />
            </>
          )}
          <HelpMessageButton
            message={'해당 주류 리뷰에 대한 인증샷은 필수입니다.'}
          />
        </section>

        <section>
          <SectionHeader title='칠러님의 별점 및 리뷰' dot={false} />
          <Rating
            size={40}
            fullSymbol={
              <Image src={'/icons/별_1.svg'} alt='1' width={40} height={40} />
            }
            emptySymbol={
              <Image src={'/icons/별_0.svg'} alt='0' width={40} height={40} />
            }
            {...form.getInputProps('rating')}
          />
          <HelpMessageButton message={'해당 주류에 대한 별점을 매겨주세요.'} />
          <Textarea
            className={classes['textarea']}
            {...form.getInputProps('content')}
          />
          <Flex
            w={'100%'}
            justify={'flex-end'}
          >{`${form.getValues().content.length} / 250`}</Flex>
          <HelpMessageButton message='해당 주류에 대한 평가를 해주세요. (최소 20자 최대 250자)' />
          <Divider my={'2.5rem'} />
        </section>

        <div className={classes['situation-section-wrapper']}>
          <SectionHeader title='누구랑 마시면 좋을까요?' />
          <div>
            {situationItems.map(item => (
              <SituationButton
                key={item.value}
                label={item.label}
                value={item.value}
                isSelected={form.values.situation_dto[item.value]}
              />
            ))}
          </div>
        </div>
        <HelpMessageButton message='누구랑 마시면 좋을지 1개 이상, 3개 이하 선택해주세요.' />
        <Divider my={'2.5rem'} />

        <SectionHeader title='어떤 맛이 느껴지나요?' />
        <div className={classes['taste-section-wrapper']}>
          <div className={classes['taste-guide']}>
            <span>약함</span>
            <span>강함</span>
          </div>
          <div className={classes['taste-inputs-wrapper']}>
            <TasteInput taste='sweet' />
            <TasteInput taste='sour' />
            <TasteInput taste='bitter' />
            <TasteInput taste='refresh' />
            <TasteInput taste='body' />
          </div>
        </div>
        <HelpMessageButton message='느껴지는 맛을 평가해주세요.' />
        <Divider my={'2.5rem'} />

        <div className={classes['flavor-section-wrapper']}>
          <SectionHeader title='어떤 향이 느껴지나요?' />
          <div>
            {flavorItems.map((item, idx) => (
              <label
                key={item.value}
                className={`${classes['flavor-chip']} ${form.values.flavors[idx] && classes['selected']}`}
              >
                <input
                  type='checkbox'
                  value={item.value}
                  {...form.getInputProps(`flavors.${item.value - 1}`)}
                />
                {item.label}
              </label>
            ))}
          </div>
          <HelpMessageButton message='느껴지는 향을 1개 이상 골라주세요.' />
          <Divider my={'2.5rem'} />
        </div>

        <div className={classes['food-section-wrapper']}>
          <SectionHeader title='어떤 안주랑 어울리나요?' />
          <div>
            {foodItems.map((item, idx) => (
              <FoodButton
                key={item.value}
                label={item.label}
                value={item.value}
                isSelected={form.values.foods[idx]}
              />
            ))}
          </div>
        </div>
        <HelpMessageButton message='추천하는 안주를 1개 이상 골라주세요.' />
        <div className={classes['button-wrapper']}>
          <Link href='/'>작성 취소</Link>
          <Button variant='primary' type='submit'>
            작성 완료
          </Button>
        </div>
      </form>
    </ReviewFormProvider>
  );
};

export default ReviewWriteForm;
