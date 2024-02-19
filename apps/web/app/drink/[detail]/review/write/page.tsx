import React from 'react';
import classes from './page.module.scss';
import ReviewWriteForm from './(components)/ReviewWriteForm';

const ReviewWritePage = () => {
  return (
    <div className={classes['review-wrapper']}>
      <h1 className={classes['page-title']}>술 리뷰 작성하기</h1>
      <h2>유럽식 레몬 라들러 스타일 기반 과일 맥주</h2>
      <ReviewWriteForm />
    </div>
  );
};

export default ReviewWritePage;
