import { forwardRef } from 'react';
import { createPolymorphicComponent, UnstyledButton, UnstyledButtonProps } from '@mantine/core';

import CancelFilledIcons from '@/assets/cancel_filled.svg?react';

interface CloseIconButtonProps extends UnstyledButtonProps {
    // imageUrl: string;
}

// Default root element is 'button', but it can be changed with 'component' prop
const CloseIconButton = createPolymorphicComponent<'button', CloseIconButtonProps>(
    forwardRef<HTMLButtonElement, CloseIconButtonProps>(({ ...others }, ref) => {
        console.log('CancelFilledIcons', CancelFilledIcons)
        return (
            <UnstyledButton {...others} ref={ref} w={24} h={24} >
                <CancelFilledIcons />
            </UnstyledButton>
        )
    })
);
export default CloseIconButton;