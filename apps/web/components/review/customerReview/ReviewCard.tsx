'use client';
import StarScore from '@/components/animation/StarScore';
import { useReviewDetailQuery } from '@/hooks/queries/useReviewQuery';
import { Box, Flex } from '@mantine/core';
import {
  ModalContent,
  ModalRoot,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Modal,
} from '@team-complete/complete-ui';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import classes from './ReviewCard.module.scss';

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
    const dateObject = new Date(data.created_date);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();
    let monthResult = '';

    if (month < 10) {
      monthResult = '0' + month.toString();
    } else {
      monthResult = month.toString();
    }
    const formattedDate = year + '.' + month + '.' + day;

    return (
      // <Modal
      //   className={classes['review-detail-card']}
      //   opened={modalOpen}
      //   onClose={modalHandler}
      //   size={'40.5rem'}
      // ></Modal>
      <ModalRoot opened={modalOpen} onClose={modalHandler} size={'40.5rem'}>
        <ModalOverlay />
        <ModalContent className={classes['review-detail-card']}>
          <Box className={classes['review-detail-wrapper']}>
            <ModalHeader className={classes['review-detail-header']}>
              <Flex gap={'24px'}>
                <Box>
                  <Image
                    src={data.image_url}
                    alt='리뷰 사진'
                    width={80}
                    height={80}
                    sizes={'width:80px; height:80px'}
                  />
                </Box>
                <Flex direction='column'>
                  <Flex>
                    <Box>{data.writer_dto.nickname}</Box>
                    <Flex
                      align={'center'}
                      h={'100%'}
                      mx={'6px'}
                      color={'#E5E6E8'}
                    >
                      |
                    </Flex>
                    <Box>{formattedDate}</Box>
                  </Flex>
                  <Box>
                    <StarScore score={data.rating} />
                  </Box>
                </Flex>
              </Flex>
            </ModalHeader>
            <ModalBody>
              <Box>평가</Box>
              <Flex className={classes['review-detail-content-card']}>
                <Box>이 술은,</Box>
                <Box>
                  
                </Box>
              </Flex>
            </ModalBody>
          </Box>
        </ModalContent>
      </ModalRoot>
    );
  } else {
    return null;
  }
};

export default CustomerReviewCard;
