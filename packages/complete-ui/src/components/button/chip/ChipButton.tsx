import { cn } from '@/utils/util';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';
import classes from './ChipButton.module.css';

interface ChipButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipButtonVariants> {}

const chipButtonVariants = cva(classes.ChipButtonWrapper, {
  variants: {
    variant: {
      full: classes[`ChipButton-full`],
      outline: classes[`ChipButton-outline`],
      ghost: classes[`ChipButton-ghost`],
    },
    background: {
      white: classes[`ChipButton-full-background-white`],
      primary: classes[`ChipButton-full-background-primary`],
      none: classes[`ChipButton-full-background-none`],
    },
  },
  defaultVariants: {
    variant: `full`,
    background: `none`,
  },
});

const ChipButton = React.forwardRef<HTMLButtonElement, ChipButtonProps>(
  ({ className, background, variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(chipButtonVariants({ variant, background, className }))}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export { ChipButton };
