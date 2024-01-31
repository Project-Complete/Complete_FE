import { cn } from '@/utils/util';
import { Button } from '@mantine/core';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva({});

const StyledButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }) => {
    return (
      <Button className={cn(className)} {...props}>
        {children}
      </Button>
    );
  },
);

export { StyledButton };
