import { cn } from '@/utils/util';
import { TextInput } from '@mantine/core';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import classes from './Input.module.css';

interface InputProps
  extends React.ComponentPropsWithRef<typeof TextInput>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(classes[`Input-focus`], {
  variants: {
    textColor: {
      black: classes[`Input-color-black`],
      orange: classes[`Input-color-orange`],
      red: classes[`Input-color-red`],
    },
  },
  defaultVariants: {
    textColor: 'black',
  },
});

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ textColor, className, label, ...props }, ref) => {
    return (
      <TextInput
        label={label}
        className={cn(inputVariants({ textColor, className }))}
        {...props}
        ref={ref}
      />
    );
  },
);

export { Input };
