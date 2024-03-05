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
  Chip,
} from '@team-complete/complete-ui';
import Image from 'next/image';
import { Fragment } from 'react';
import classes from './ReviewCard.module.scss';
import { findMinMaxTaste } from '@/utils/findMinMaxTaste';

type SituationKeys = 'adult' | 'alone' | 'business' | 'friend' | 'partner';

const situation = {
  adult: {
    label: '웃어른',
    image: '/detail_who/adult_sum.svg',
  },
  alone: {
    label: '나 혼자',
    image: '/detail_who/alone_sum.svg',
  },
  business: {
    label: '비즈니스',
    image: '/detail_who/business_sum.svg',
  },
  friend: {
    label: '친구',
    image: '/detail_who/friend_sum.svg',
  },
  partner: {
    label: '연인',
    image: '/detail_who/partner_sum.svg',
  },
};

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

    const [minTasteValues, maxTasteValues] = findMinMaxTaste(data.taste);
    console.log(minTasteValues, maxTasteValues);
    return (
      <ModalRoot opened={modalOpen} onClose={modalHandler} size={'40.5rem'}>
        <ModalOverlay />
        <ModalContent className={classes['review-detail-card']}>
          <Box className={classes['review-detail-wrapper']}>
            <ModalHeader className={classes['review-detail-header']}>
              <Flex gap={'24px'}>
                <Box>
                  <Image
                    src={
                      data.image_url !== 'string'
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
              <Flex direction={'column'} rowGap={'0.75rem'}>
                <Flex className={classes['review-detail-content-card']}>
                  {/* 술 */}
                  <Box>이 술은,</Box>
                  <Flex gap={'0.5rem'} wrap={'wrap'} align={'center'}>
                    {Object.keys(data.situation).map((e, i) => (
                      <Fragment key={i}>
                        {data.situation[e as SituationKeys] && (
                          <Chip className={classes['review-chip']}>
                            <Flex gap={'0.5rem'} align={'center'}>
                              <Image
                                src={situation[e as SituationKeys].image}
                                alt={situation[e as SituationKeys].label}
                                width={32}
                                height={32}
                                sizes='width="2rem" height="2rem"'
                              />
                              {situation[e as SituationKeys].label}
                            </Flex>
                          </Chip>
                        )}
                      </Fragment>
                    ))}
                    <Text
                      size='1.25rem'
                      fw={600}
                      lh={'1.875rem'}
                      color='rgba(0, 0, 0, 0.95)'
                    >
                      이랑(에서) 마시면 좋아요.
                    </Text>
                  </Flex>
                </Flex>
                {/* 맛 */}
                <Flex className={classes['review-detail-content-card']}>
                  <Box>마셔봤을 때,</Box>
                  <Flex gap={'0.5rem'} wrap={'wrap'} align={'center'}>
                    {maxTasteValues.map((e, i) => (
                      <Fragment key={i}>
                        <Chip className={classes['review-chip']}>
                          <Flex gap={'0.5rem'} align={'center'}>
                            {e}
                          </Flex>
                        </Chip>
                      </Fragment>
                    ))}
                    <Text
                      size='1.25rem'
                      fw={600}
                      lh={'1.875rem'}
                      color='rgba(0, 0, 0, 0.95)'
                    >
                      이 강하고,
                    </Text>
                    {minTasteValues.map((e, i) => (
                      <Fragment key={i}>
                        <Chip className={classes['review-chip']}>
                          <Flex gap={'0.5rem'} align={'center'}>
                            {e}
                          </Flex>
                        </Chip>
                      </Fragment>
                    ))}
                    <Text
                      size='1.25rem'
                      fw={600}
                      lh={'1.875rem'}
                      color='rgba(0, 0, 0, 0.95)'
                    >
                      이 약해요.
                    </Text>
                  </Flex>
                </Flex>
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
