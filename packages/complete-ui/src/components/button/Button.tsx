import { cn } from '@/utils/util';
import { Button } from '@mantine/core';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.css';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(classes.button, {
  variants: {
    size: {
      md: classes[`button-md`],
      lg: classes[`button-lg`],
    },
  },
  defaultVariants: {
    size: `md`,
  },
});
//  cn({ size, className });
const StyledButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <Button
        className={cn(buttonVariants({ size, className }))}
        {...props}
        ref={ref}
      >
        {children}
      </Button>
    );
  },
);

export { StyledButton };
