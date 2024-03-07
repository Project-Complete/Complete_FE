import { situation, tastes, foods } from '@/constants/drinks';
import { Flex, Box, Text } from '@mantine/core';
import { Fragment } from 'react';
import classes from './ReviewCard.module.scss';
import { DrinkDetailReview } from '@/types/review';
import Image from 'next/image';
import { findMinMaxTaste } from '@/utils/findMinMaxTaste';
import { Chip } from '@team-complete/complete-ui';

type SituationKeys = 'adult' | 'alone' | 'business' | 'friend' | 'partner';

const ReviewEvaluation = ({ data }: { data: DrinkDetailReview }) => {
  const [minTasteValues, maxTasteValues] = findMinMaxTaste(data.taste);
  return (
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
                  {tastes[e]}
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
                <Flex gap={'0.5rem'} h={'100%'} w={'100%'} align={'center'}>
                  {tastes[e]}
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
      {/* 향 */}
      <Flex className={classes['review-detail-content-card']}>
        <Box>향을 맡았을 때,</Box>
        <Flex gap={'0.5rem'} wrap={'wrap'} align={'center'}>
          {data.flavors.map((e, i) => (
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
            의 향이 느껴져요.
          </Text>
        </Flex>
      </Flex>
      {/* 안주 */}
      <Flex className={classes['review-detail-content-card']}>
        <Box>안주는요,</Box>
        <Flex gap={'0.5rem'} wrap={'wrap'} align={'center'}>
          {data.foods.map((e, i) => (
            <Fragment key={i}>
              <Chip className={classes['review-chip']}>
                <Flex gap={'0.5rem'} align={'center'}>
                  <Image
                    src={foods[e]!}
                    alt={e}
                    width={32}
                    height={32}
                    sizes='width="2rem" height="2rem"'
                  />
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
            와 어울려요.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ReviewEvaluation;
