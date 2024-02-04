'use client';
import { Flex } from '@mantine/core';
import { motion } from 'framer-motion';
import classes from './StarScore.module.css';

type StarScorePropsType = {
  score: number;
  maxScore?: number;
};

const getCalcScore = ({
  startPx,
  movePx,
  percent,
}: {
  startPx: number;
  movePx: number;
  percent: number;
}) => {
  return startPx + movePx * percent;
};

const Star = ({ percent, index }: { percent: number; index: number }) => {
  // 5px(여백) 14px(별 너비) 5px(여백)
  // 14px 안에서 움직여야함.
  // 고로 14px 기준 percent로 에니메이션 부여
  const startPx = -19;
  const movePx = 14;
  const calcScore = getCalcScore({ startPx, movePx, percent });

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      overflow={'hidden'}
      style={{ position: 'relative' }}
    >
      <g
        clipPath='url(#clip0_712_541)'
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        {/* outer 부분 (노란색) */}
        <motion.rect
          width={24}
          height={24}
          fill={'red'}
          initial={{ x: startPx }}
          animate={{ x: calcScore }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: index * 0.1 }}
          style={{ position: 'absolute' }}
        />
        <path
          d='M 12 5.4318 L 13.7844 9.0474 C 14.0538 9.5934 14.5746 9.9717 15.177 10.0593 L 19.167 10.6392 L 16.2797 13.4535 C 15.8439 13.8786 15.6449 14.4906 15.7479 15.0906 L 16.4295 19.0644 L 12.8607 17.1882 C 12.5964 17.0493 12.2987 16.9758 12 16.9758 C 11.7011 16.9758 11.4036 17.0493 11.1392 17.1882 L 7.5705 19.0644 L 8.2521 15.0906 C 8.355 14.4906 8.1561 13.8783 7.7202 13.4535 L 4.833 10.6392 L 8.823 10.0593 C 9.4256 9.9717 9.9461 9.5934 10.2155 9.0474 L 12 5.4318 Z M 0 0 L 0 24 L 24 24 L 24 0'
          fill={'white'}
        />
        <path
          d='M12 5.43182L13.7844 9.04742C14.0538 9.59342 14.5746 9.97172 15.177 10.0593L19.167 10.6392L16.2797 13.4535C15.8439 13.8786 15.6449 14.4906 15.7479 15.0906L16.4295 19.0644L12.8607 17.1882C12.5964 17.0493 12.2987 16.9758 12 16.9758C11.7011 16.9758 11.4036 17.0493 11.1392 17.1882L7.57045 19.0644L8.25205 15.0906C8.35495 14.4906 8.15605 13.8783 7.72015 13.4535L4.83295 10.6392L8.82295 10.0593C9.42565 9.97172 9.94615 9.59342 10.2155 9.04742L12 5.43182ZM12 3.53882C11.7684 3.53882 11.5364 3.65942 11.4173 3.90092L9.13945 8.51642C9.04495 8.70812 8.86195 8.84102 8.65015 8.87192L3.55675 9.61202C3.02395 9.68942 2.81095 10.3443 3.19675 10.7202L6.88225 14.3127C7.03525 14.4621 7.10515 14.6769 7.06915 14.8878L6.19915 19.9605C6.12715 20.3805 6.46075 20.7216 6.83935 20.7216C6.93925 20.7216 7.04245 20.6979 7.14175 20.6454L11.6973 18.2505C11.7917 18.2007 11.8959 18.1758 11.9997 18.1758C12.1034 18.1758 12.2073 18.2007 12.3021 18.2505L16.8575 20.6454C16.9572 20.6976 17.0601 20.7216 17.16 20.7216C17.5386 20.7216 17.8722 20.3805 17.8002 19.9605L16.9302 14.8878C16.8942 14.6769 16.9638 14.4621 17.1171 14.3127L20.8025 10.7202C21.188 10.3443 20.9753 9.68942 20.4426 9.61202L15.3492 8.87192C15.1377 8.84132 14.9546 8.70812 14.8598 8.51642L12.582 3.90092C12.4629 3.65942 12.231 3.53882 11.9994 3.53882H12'
          fill={'gray'}
        />
      </g>
    </svg>
  );
};

const StarScore = ({ score, maxScore = 5 }: StarScorePropsType) => {
  const integerScore = Math.floor(score);
  const decimalScore = score - integerScore;
  return (
    <Flex pos={'relative'} className={classes['star-score-layout']}>
      <Flex bg={'white'} style={{ overflow: 'hidden' }}>
        {Array.from({ length: maxScore }).map((_, index) => {
          const percent =
            decimalScore >= index + 1 ? 1 : Math.max(0, score - index);
          return (
            <Star
              key={index}
              percent={percent > 1 ? 1 : percent}
              index={index}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default StarScore;
