import { cn } from '@/utils/util';
import { VariantProps, cva } from 'class-variance-authority';
import React, { HTMLAttributes } from 'react';
import classes from './Chip.module.scss';

interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

const chipVariants = cva(classes[`Chip-button-wrapper`], {
  variants: {
    variant: {
      //   primary: classes[`Chip-button-background-primary`],
      //   gray: classes[`Chip-button-background-gray`],
      outline: classes[`Chip-background-outline`],
    },
  },
  defaultVariants: {
    variant: `outline`,
  },
});

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        className={cn(chipVariants({ variant, className }))}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

export { Chip };
