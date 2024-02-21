import { Rating } from '@mantine/core';
import React from 'react';
import { useReviewFormContext } from './form-context';
import classes from './TasteInput.module.scss';
import Image from 'next/image';

interface TasteLabel {
  [key: string]: string | string[];
}

const tasteLabel: TasteLabel = {
  sweet: '단맛',
  sour: '산미',
  bitter: '쓴맛',
  body: '청량감',
  refresh: ['목넘김', '바디감'],
};

interface TasteInputProps {
  taste: string;
}

const TasteInput = ({ taste }: TasteInputProps) => {
  const form = useReviewFormContext();

  return (
    <div className={classes['taste-input-wrapper']}>
      {Array.isArray(tasteLabel[taste]) ? (
        <div className={classes['taste-label']}>
          <span className={classes['tast-sub-label']}>
            {`(${tasteLabel[taste]?.[0]})`}
          </span>
          <span>{tasteLabel[taste]?.[1]}</span>
        </div>
      ) : (
        <div className={classes['taste-label']}>{tasteLabel[taste]}</div>
      )}

      <Rating
        {...form.getInputProps(`taste.${taste}`)}
        highlightSelectedOnly
        emptySymbol={
          <Image src={'/radio_empty.svg'} alt='' width={32} height={32} />
        }
        fullSymbol={
          <Image src={'/radio_full.svg'} alt='' width={32} height={32} />
        }
      />
    </div>
  );
};

export default TasteInput;
