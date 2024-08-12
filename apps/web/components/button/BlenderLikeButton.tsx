'use client';

import { useLikeBlenderMutation } from '@/hooks/mutates/useBlenderMutate';
import { useState } from 'react';
import classes from './LikeButton.module.scss';
import { Button } from '@team-complete/complete-ui';
import Image from 'next/image';
import heart from '@/assets/heart.svg';

const BlenderLikeButton = ({
  combinationsId,
  isLike,
}: {
  combinationsId: number;
  isLike: boolean;
}) => {
  const [hoverState, setHoverState] = useState(false);
  const { mutate } = useLikeBlenderMutation();
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
        mutate({
          combinationsId,
          like: isLike,
        });
      }}
    >
      {hoverState ? (
        <Image
          src='/icons/like_fill.svg'
          alt='like'
          width={24}
          height={24}
        ></Image>
      ) : (
        <>
          {isLike ? (
            <Image
              src='/icons/like_fill.svg'
              alt='like'
              width={24}
              height={24}
            />
          ) : (
            <Image src={heart} alt='like' width={24} height={24} />
          )}
        </>
      )}
    </Button>
  );
};

export default BlenderLikeButton;
