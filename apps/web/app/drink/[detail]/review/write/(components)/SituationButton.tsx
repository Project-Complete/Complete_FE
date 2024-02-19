import Image from 'next/image';
import React from 'react';
import {
  Situation,
  SituationItemsLabelType,
  SituationItemsValueType,
} from './ReviewWriteForm';
import classes from './IconButton.module.scss';

interface SituationButtonProps {
  label: SituationItemsLabelType;
  value: SituationItemsValueType;
  isSelected: boolean;
  situation: Situation;
  setSituation: React.Dispatch<React.SetStateAction<Situation>>;
}

const SituationButton = ({
  label,
  value,
  isSelected,
  situation,
  setSituation,
}: SituationButtonProps) => {
  return (
    <div
      className={classes['icon-button-wrapper']}
      onClick={() => setSituation({ ...situation, [value]: !situation[value] })}
    >
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
    </div>
  );
};

export default SituationButton;
