import { cn } from '@/utils/util';
import { Select } from '@mantine/core';
import React from 'react';
import classes from './Dropdown.module.css';

const Dropdown = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<typeof Select>
>(({ className, ...props }, ref) => {
  return (
    <Select className={cn(classes.Dropdown, className)} {...props} ref={ref} />
  );
});

export { Dropdown };
