'use client';

import { Button } from '@team-complete/complete-ui';
import Image from 'next/image';
import { Box } from '@mantine/core';
import classes from './ShareButton.module.scss';
import { useState } from 'react';

const ShareButton = () => {
  const [hoverState, setHoverState] = useState(false);
  return (
    <Button
      className={classes[`share-button`]}
      onMouseOver={() => {
        setHoverState(true);
      }}
      onMouseOut={() => {
        setHoverState(false);
      }}
    >
      <Box
        className={hoverState ? classes[`share-button-text`] : classes[`text`]}
      >
        공유하기
      </Box>
      {hoverState ? (
        <Image
          src={'/icons/공유하기_fill.svg'}
          alt='share'
          width={24}
          height={24}
        />
      ) : (
        <Image src={'/share.svg'} alt='share' width={24} height={24} />
      )}
    </Button>
  );
};

export default ShareButton;
