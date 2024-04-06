'use client';
import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import classes from './ReviewWriteForm.module.scss';
import Image from 'next/image';
import HelpMessageButton from './HelpMessageButton';
import { Rating } from '@mantine/core';
import SituationButton from './SituationButton';
import FoodButton from './FoodButton';
import { FormValues, ReviewFormProvider, useReviewForm } from './form-context';
import TasteInput from './TasteInput';
import { Button } from '@team-complete/complete-ui';
import { api } from '@/utils/api';

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

interface PreSignedUrlResponse {
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
  const form = useReviewForm({
    initialValues: {
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
      flavors: Array.from({ length: foodItems.length }, () => false),
      foods: Array.from({ length: foodItems.length }, () => false),
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
      if (!image.file) {
        const reader = new FileReader();

        reader.onload = () => {
          setImage({ file: file, src: reader.result as string });
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

      return response.pre_signed_url.split('?')[0];
    } catch (error) {
      throw new Error('pre signed url 전송 실패');
    }
  };

  const postImage = async (storageUrl: string) => {
    try {
      const response = await api.put(storageUrl, {
        prefixUrl: '',
        body: image.file,
      });

      console.log('pose image response', response);

      return response;
    } catch (error) {
      console.error('image post error', error);
      throw new Error('리뷰 이미지 등록실패');
    }
  };

  const handleSubmit = async (values: FormValues) => {
    event?.preventDefault();
    try {
      const presignedUrlResponse = await postImageName();

      await postImage(presignedUrlResponse || '');

      const response = await api
        .post(`reviews`, {
          json: {
            drink_id: parseInt(drinkId),
            image_url: presignedUrlResponse,
            ...values,
          },
        })
        .json();

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('리뷰 작성 실패');
    }
  };

  return (
    <ReviewFormProvider form={form}>
      <form
        className={classes['form']}
        onSubmit={form.onSubmit(values => handleSubmit(values))}
      >
        <section className={classes['image-section']}>
          {image.src && (
            <div className={classes['image-wrapper']}>
              <div>
                <Image src={image.src} alt='thumbnail' fill />
                <button
                  onClick={() =>
                    setImage({
                      file: null,
                      src: '',
                    })
                  }
                >
                  <Image
                    src={'/icons/닫기.svg'}
                    alt='x'
                    height={20}
                    width={20}
                  />
                </button>
              </div>
            </div>
          )}
          <SectionHeader title='인증샷' dot={false} />
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
          <HelpMessageButton />
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
          <HelpMessageButton />
          <textarea
            className={classes['textarea']}
            {...form.getInputProps('content')}
          />
          <HelpMessageButton />
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
            <TasteInput taste='body' />
            <TasteInput taste='refresh' />
          </div>
        </div>

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
          <HelpMessageButton />
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
        <div className={classes['button-wrapper']}>
          <Button variant='outline'>작성 취소</Button>
          <Button variant='primary' type={'submit'}>
            작성 완료
          </Button>
        </div>
      </form>
    </ReviewFormProvider>
  );
};

export default ReviewWriteForm;
