import { cn } from '@/utils/util';
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
    variant: {
      primary: classes[`button-primary`],
      outline: classes[`button-outline`],
      white: classes[`button-white`],
      'white-primary': classes[`button-white-primary`],
    },
  },
  defaultVariants: {
    size: `md`,
    variant: 'white-primary',
  },
});

const StyledButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ size, variant, className }))}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export { StyledButton };
