'use client';

import { Tooltip, UnstyledButton } from '@mantine/core';
import classes from './WriteButton.module.scss';
import PencilButton from '@/assets/PencilButton';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const DetailWriteButton = ({ drinkName }: { drinkName: string }) => {
  const params = useParams();

  if (params && params.detail) {
    return (
      <Tooltip label='리뷰 작성하러 가기'>
        <Link
          href={{
            pathname: `/drink/${params.detail}/review/write`,
            query: {
              drinkName,
            },
          }}
          className={classes[`FloatingButtonWrapper`]}
        >
          <PencilButton color='white' size={80} />
        </Link>
      </Tooltip>
    );
  } else {
    return null;
  }
};

export default DetailWriteButton;
