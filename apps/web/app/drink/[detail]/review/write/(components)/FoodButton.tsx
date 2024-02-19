import React from 'react';
import Image from 'next/image';
import classes from './IconButton.module.scss';

interface FoodButtonProps {
  label: string;
  value: number;
  isSelected: boolean;
  food: Set<number>;
  setFood: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const FoodButton = ({
  label,
  value,
  isSelected,
  food,
  setFood,
}: FoodButtonProps) => {
  return (
    <div
      className={classes['icon-button-wrapper']}
      onClick={() =>
        setFood(prevFood => {
          const newFood = new Set<number>(prevFood);
          if (isSelected) newFood.delete(value);
          else newFood.add(value);
          return newFood;
        })
      }
    >
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
    </div>
  );
};

export default FoodButton;
