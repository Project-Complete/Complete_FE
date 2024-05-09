import Image from 'next/image';
import React from 'react';
import {
  SituationItemsLabelType,
  SituationItemsValueType,
} from './ReviewWriteForm';
import classes from './IconButton.module.scss';
import { useReviewFormContext } from './form-context';
import { Checkbox } from '@mantine/core';

interface SituationButtonProps {
  label: SituationItemsLabelType;
  value: SituationItemsValueType;
  isSelected: boolean;
}

const SituationButton = ({
  label,
  value,
  isSelected,
}: SituationButtonProps) => {
  const form = useReviewFormContext();

  return (
    <label className={classes['icon-button-wrapper']}>
      <Image
        src={
          isSelected
            ? `/detail_who/${value}_sum.svg`
            : `/detail_who/${value}_empty.svg`
        }
        alt={label}
        width={92}
        height={92}
      />
      <div>{label}</div>
      <Checkbox
        className={classes[`icon-button-input`]}
        type='checkbox'
        value={value}
        {...form.getInputProps(`situation_dto.${value}`)}
      />
    </label>
  );
};

export default SituationButton;
