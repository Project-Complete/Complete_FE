import { cn } from '@/utils/util';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';
import classes from './ChipButton.module.css';

interface ChipButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipButtonVariants> {}

const chipButtonVariants = cva(classes[`Chip-button-wrapper`], {
  variants: {
    variant: {
      primary: classes[`Chip-button-background-primary`],
      gray: classes[`Chip-button-background-gray`],
    },
  },
  defaultVariants: {
    variant: `primary`,
  },
});

const ChipButton = React.forwardRef<HTMLButtonElement, ChipButtonProps>(
  ({ className,  variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(chipButtonVariants({ variant, className }))}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export { ChipButton };
