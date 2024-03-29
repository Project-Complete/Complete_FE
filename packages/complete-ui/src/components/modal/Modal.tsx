import { cn } from '@/utils/util';
import {
  MantineComponent,
  ModalBaseStylesNames,
  ModalContentProps,
  ModalOverlayProps,
  Modal as ModalPrimitive,
  ModalProps,
  ModalRootProps,
} from '@mantine/core';
import React from 'react';

export const ModalRoot: MantineComponent<{
  props: ModalRootProps;
  ref: HTMLDivElement;
  stylesNames: ModalBaseStylesNames;
  vars: unknown;
  compound: true;
}> = ModalPrimitive.Root;
export const ModalOverlay: MantineComponent<{
  props: ModalOverlayProps;
  ref: HTMLDivElement;
  stylesNames: 'overlay';
  compound: true;
}> = ModalPrimitive.Overlay;
export const ModalCloseButton = ModalPrimitive.CloseButton;
export const ModalTitle = ModalPrimitive.Title;
export const ModalHeader = ModalPrimitive.Header;
export const ModalBody = ModalPrimitive.Body;

const Modal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    ModalProps & {
      overlay?: boolean;
    }
>(
  (
    {
      children,
      centered = true,
      overlay = false,
      opened,
      onClose,
      className,
      w = '100rem',
      withCloseButton = false,
      ...props
    },
    ref,
  ) => {
    return (
      <ModalPrimitive
        centered={centered}
        opened={opened}
        onClose={onClose}
        w={w}
        overlayProps={
          overlay
            ? { backgroundOpacity: 0.7, blur: 3 }
            : { backgroundOpacity: 0.7 }
        }
        className={cn(``, className)}
        {...props}
        ref={ref}
        withCloseButton={withCloseButton}
      >
        {children}
      </ModalPrimitive>
    );
  },
);

const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ModalContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <ModalPrimitive.Content
      className={cn(className)}
      {...props}
      ref={ref}
    >
      {children}
    </ModalPrimitive.Content>
  );
});

export { ModalContent, Modal };
