import { cn } from '@/utils/util';
import { Button } from '@mantine/core';
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
    },
    background: {
      white: classes[`ChipButton-full-background-white`],
      primary: classes[`ChipButton-full-background-primary`],
    },
  },
  defaultVariants: {
    variant: `full`,
    background: `white`,
  },
});

const ChipButton = React.forwardRef<HTMLButtonElement, ChipButtonProps>(
  ({ className, background, variant, children, ...props }, ref) => {
    return (
      <Button
        className={cn(chipButtonVariants({ variant, background, className }))}
        {...props}
        ref={ref}
      >
        {children}
      </Button>
    );
  },
);

export { ChipButton };