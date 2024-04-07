'use client';

import { Button } from '@team-complete/complete-ui';
import Image from 'next/image';
import classes from './LikeButton.module.scss';
import { useState } from 'react';
import heart from '@/assets/heart.svg';
import { useLikeMutate, useUnLikeMutate } from '@/hooks/mutates/useLikeMutate';

const LikeButton = ({
  drink_id,
  drink_like,
}: {
  drink_id: number;
  drink_like: boolean;
}) => {
  const [hoverState, setHoverState] = useState(false);
  const { mutate } = useLikeMutate(drink_id);
  const { mutate: dislike } = useUnLikeMutate(drink_id);

  if (!drink_like) {
    return (
      <Button
        className={classes['like-button']}
        onMouseOver={() => {
          setHoverState(true);
        }}
        onMouseOut={() => {
          setHoverState(false);
        }}
        onClick={() => {
          mutate();
        }}
      >
        {hoverState ? (
          <Image
            src='/icons/like_fill.svg'
            alt='like'
            width={40}
            height={40}
          ></Image>
        ) : (
          <Image src={heart} alt='like' width={40} height={40} />
        )}
      </Button>
    );
  } else {
    return (
      <Button
        className={classes['like-button']}
        onMouseOver={() => {
          setHoverState(true);
        }}
        onMouseOut={() => {
          setHoverState(false);
        }}
        onClick={() => {
          dislike();
        }}
      >
        {hoverState ? (
          <Image src={heart} alt='like' width={40} height={40} />
        ) : (
          <Image
            src='/icons/like_fill.svg'
            alt='like'
            width={40}
            height={40}
          ></Image>
        )}
      </Button>
    );
  }
};

export default LikeButton;
