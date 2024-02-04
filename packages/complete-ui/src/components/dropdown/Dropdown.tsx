import { cn } from '@/utils/util';
import { Select } from '@mantine/core';
import React from 'react';
import classes from './Dropdown.module.css';
import './style.css';

const Dropdown = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<typeof Select>
>(({ className, ...props }, ref) => {
  return (
    <Select
      className={cn(classes.Dropdown, className)}
      {...props}
      ref={ref}
      comboboxProps={{
        position: 'bottom',
        middlewares: { flip: false, shift: false },
        offset: 0,
      }}
    />
  );
});

export { Dropdown };
