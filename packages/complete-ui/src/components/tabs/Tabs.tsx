import { cn } from '@/utils/util';
import { Tabs as TabPrimitive } from '@mantine/core';
import React from 'react';
import classes from './Tabs.module.scss';

export const Tabs = TabPrimitive;
// export const Tab = TabPrimitive.Tab;
export const TabsPanel = TabPrimitive.Panel;

const TabList = React.forwardRef<
  React.ElementRef<typeof TabPrimitive.List>,
  React.ComponentPropsWithRef<typeof TabPrimitive.List> & {
    glow?: boolean;
    justify?: 'center' | 'flex-end' | 'space-between' | 'flex-start';
  }
>(({ children, glow = true, justify = 'center', className, ...props }, ref) => {
  return (
    <TabPrimitive.List
      grow={glow}
      justify={justify}
      className={cn(className)}
      {...props}
      ref={ref}
    >
      {children}
    </TabPrimitive.List>
  );
});

const Tab = React.forwardRef<
  React.ElementRef<typeof TabPrimitive.Tab>,
  React.ComponentPropsWithRef<typeof TabPrimitive.Tab>
>(({ children, className, ...props }, ref) => {
  return (
    <TabPrimitive.Tab
      className={cn(classes[`Tab`], className)}
      {...props}
      ref={ref}
    >
      {children}
    </TabPrimitive.Tab>
  );
});

export { TabList, Tab };
