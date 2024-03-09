import React from 'react';
import Image from 'next/image';
import classes from './IconButton.module.scss';
import { useReviewFormContext } from './form-context';

interface FoodButtonProps {
  label: string;
  value: number;
  isSelected?: boolean | number;
}

const FoodButton = ({ label, value, isSelected }: FoodButtonProps) => {
  const form = useReviewFormContext();

  return (
    <label className={classes['icon-button-wrapper']}>
      <input
        type='checkbox'
        value={value}
        {...form.getInputProps(`foods.${value - 1}`)}
      />
      <Image
        src={
          isSelected
            ? `/안주/${label.replaceAll(' ', '_')}.svg`
            : `/안주/${label.replaceAll(' ', '_')}_empty.svg`
        }
        alt={label}
        width={92}
        height={92}
      />
      <div>{label}</div>
    </label>
  );
};

export default FoodButton;
