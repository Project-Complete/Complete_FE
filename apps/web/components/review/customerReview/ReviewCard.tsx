'use client';
import StarScore from '@/components/animation/StarScore';
import { useReviewDetailQuery } from '@/hooks/queries/useReviewQuery';
import { Box, Flex, Text } from '@mantine/core';
import {
  ModalContent,
  ModalRoot,
  ModalOverlay,
  ModalHeader,
  ModalBody,
} from '@team-complete/complete-ui';
import Image from 'next/image';
import classes from './ReviewCard.module.scss';
import ReviewEvaluation from './Evaluation';
import { useState } from 'react';
import ReviewImageModal from './ReviewImageModal';
import { useMediaQuery } from '@mantine/hooks';

const CustomerReviewCard = ({
  modalOpen,
  modalHandler,
  reviewId,
}: {
  modalOpen: boolean;
  modalHandler: () => void;
  reviewId: number;
}) => {
  const [imageModalState, setImageModalState] = useState(false);
  const isMobile = useMediaQuery('(max-width: 48em)');
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
    const formattedDate = year + '.' + monthResult + '.' + day;

    const imageModalHandler = () => {
      setImageModalState(prev => !prev);
    };

    return (
      <>
        {imageModalState && (
          <ReviewImageModal
            modalOpen={imageModalState}
            modalHandler={imageModalHandler}
            imageUrl={data.image_url}
            isMobile={isMobile}
          />
        )}
        <ModalRoot
          opened={modalOpen}
          onClose={modalHandler}
          size={'40.5rem'}
          fullScreen={isMobile}
          centered
        >
          <ModalOverlay />
          <ModalContent className={classes['review-detail-card']}>
            <Box className={classes['review-detail-wrapper']}>
              <ModalHeader className={classes['review-detail-header']}>
                <Flex gap={'24px'}>
                  <Box onClick={imageModalHandler}>
                    <Image
                      src={
                        data.image_url !== 'string' && data.image_url !== ''
                          ? data.image_url
                          : 'https://picsum.photos/392/288.webp'
                      }
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
                <ReviewEvaluation data={data} />
              </ModalBody>
            </Box>
          </ModalContent>
        </ModalRoot>
      </>
    );
  } else {
    return null;
  }
};

export default CustomerReviewCard;
