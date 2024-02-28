'use client';
import { useReviewDetailQuery } from '@/hooks/queries/useReviewQuery';
import { Box, Flex } from '@mantine/core';
import {
  ModalContent,
  ModalRoot,
  ModalOverlay,
  ModalHeader,
  ModalBody,
} from '@team-complete/complete-ui';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const CustomerReviewCard = ({
  modalOpen,
  modalHandler,
  reviewId,
}: {
  modalOpen: boolean;
  modalHandler: () => void;
  reviewId: number;
}) => {
  const { data } = useReviewDetailQuery({ reviewId });
  console.log(data);
  if (data) {
    return (
      <ModalRoot opened={modalOpen} onClose={modalHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex>
              <Box>
                <Image
                  src={data.image_url}
                  alt='리뷰 사진'
                  width={80}
                  height={80}
                  sizes={'width:80px; height:80px'}
                />
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <div>안녕하세요!</div>
          </ModalBody>
        </ModalContent>
      </ModalRoot>
    );
  } else {
    return null;
  }
};

export default CustomerReviewCard;
