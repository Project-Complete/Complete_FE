'use client';
import {
  ModalContent,
  ModalRoot,
  ModalOverlay,
  ModalHeader,
  ModalBody,
} from '@team-complete/complete-ui';
import { Dispatch, SetStateAction } from 'react';

const CustomerReviewCard = ({
  modalOpen,
  modalHandler,
}: {
  modalOpen: boolean;
  modalHandler: Dispatch<SetStateAction<boolean>>;
    }) => {
    
  return (
    <ModalRoot opened={modalOpen} onClose={modalHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody>
          <div>안녕하세요!</div>
        </ModalBody>
      </ModalContent>
    </ModalRoot>
  );
};

export default CustomerReviewCard;
