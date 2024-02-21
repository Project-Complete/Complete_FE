'use client';
import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import classes from './ReviewWriteForm.module.scss';
import Image from 'next/image';
import HelpMessageButton from './HelpMessageButton';
import { Rating } from '@mantine/core';
import SituationButton from './SituationButton';
import FoodButton from './FoodButton';
import { ReviewFormProvider, useReviewForm } from './form-context';
import TasteInput from './TasteInput';

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

const ReviewWriteForm = () => {
  const form = useReviewForm({
    initialValues: {
      content: '',
      situation: {
        alone: false,
        friend: false,
        partner: false,
        business: false,
        adult: false,
      },
      taste: {
        sweet: 0,
        sour: 0,
        bitter: 0,
        body: 0,
        refresh: 0,
      },
      flavors: Array.from({ length: foodItems.length }, () => false),
      foods: Array.from({ length: foodItems.length }, () => false),
    },
    validate: {},
  });
  const [rate, setRate] = useState(0);

  return (
    <ReviewFormProvider form={form}>
      <form
        className={classes['form']}
        onSubmit={form.onSubmit(values => console.log(values))}
      >
        <button type={'submit'}>버튼</button>
        <section>
          <SectionHeader title='인증샷' dot={false} />
          <button className={classes['image-attach']}>
            사진 첨부하기
            <Image
              src={'/icons/카메라.svg'}
              alt='camera'
              height={24}
              width={24}
            />
          </button>
          <HelpMessageButton />
        </section>

        <section>
          <SectionHeader title='칠러님의 별점 및 리뷰' dot={false} />
          <Rating
            size={40}
            value={rate}
            onChange={setRate}
            fullSymbol={
              <Image src={'/icons/별_1.svg'} alt='1' width={40} height={40} />
            }
            emptySymbol={
              <Image src={'/icons/별_0.svg'} alt='0' width={40} height={40} />
            }
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
                isSelected={form.values.situation[item.value]}
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
      </form>
    </ReviewFormProvider>
  );
};

export default ReviewWriteForm;
