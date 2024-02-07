import { Meta } from '@storybook/react';
import {
  ModalContent,
  Modal,
  ModalRoot,
  ModalOverlay,
  ModalCloseButton,
  ModalTitle,
  ModalHeader,
  ModalBody,
} from '@team-complete/complete-ui';
import { useState } from 'react';

const meta = {
  title: 'Modal/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Modal의 props로 opened: boolean, onClose:()=>void를 넣어주면 됩니다. https://mantine.dev/core/modal/`,
      },
    },
  },
  tags: ['autodocs'],
  //   argTypes: {
  //     textColor: {
  //       description: `내부 컬러를 변경할 때 사용합니다.`,
  //       options: [`black`, `orange`, `red`],
  //       control: { type: 'select' },
  //       defaultValue: `black`,
  //     },
  //   },
} satisfies Meta<typeof Modal>;

export default meta;

export const ModalComponent = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(prev => !prev);
  };
  return (
    <>
      <Modal title='타이틀' opened={open} onClose={onClose}>
        <div>안녕하세요!</div>
      </Modal>
      <button onClick={onClose}>Open Modal</button>
    </>
  );
};

export const ModalDetailComponent = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(prev => !prev);
  };
  return (
    <>
      <ModalRoot opened={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalTitle>타이틀</ModalTitle>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <div>안녕하세요!</div>
          </ModalBody>
        </ModalContent>
      </ModalRoot>
      <button onClick={onClose}>Open Modal</button>
    </>
  );
};
