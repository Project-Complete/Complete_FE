'use client';

import React from 'react';
import classes from './page.module.scss';
import ReviewWriteForm from './(components)/ReviewWriteForm';
import { useParams, useSearchParams } from 'next/navigation';
import { Box, Divider, Flex } from '@mantine/core';

const ReviewWritePage = ({}: {}) => {
  const params = useParams();
  const searchParams = useSearchParams();

  if (
    searchParams &&
    params &&
    params.detail &&
    typeof params.detail === 'string'
  ) {
    const name = searchParams.get('drinkName');
    const detail = params.detail;
    return (
      <Box className={classes['review-wrapper']}>
        <Flex gap={'0.75rem'} w={'100%'} h={'100%'} align={'center'}>
          <div className={classes['page-title']}>리뷰 작성하기</div>
          <Divider orientation='vertical' my={'xs'} />
          <div>{name && name}</div>
        </Flex>
        <ReviewWriteForm drinkId={detail} />
      </Box>
    );
  } else {
    return null;
  }
};

export default ReviewWritePage;
