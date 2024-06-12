'use client';

import { useBookmarkBlenderMutation } from '@/hooks/mutates/useBlenderMutate';
import { useState } from 'react';
import classes from './LikeButton.module.scss';
import { Button } from '@team-complete/complete-ui';
import Image from 'next/image';
import bookmark from '@/assets/bookmark.svg';

const BlenderBookmarkButton = ({
  combinationsId,
  isBookmark,
}: {
  combinationsId: number;
  isBookmark: boolean;
}) => {
  const [hoverState, setHoverState] = useState(false);
  const { mutate } = useBookmarkBlenderMutation();
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
          bookmark: isBookmark,
        });
      }}
    >
      {hoverState ? (
        <Image
          src='/icons/스크랩_fill.svg'
          alt='like'
          width={24}
          height={24}
        ></Image>
      ) : (
        <>
          {isBookmark ? (
            <Image
              src='/icons/스크랩_fill.svg'
              alt='like'
              width={24}
              height={24}
            />
          ) : (
            <Image src={bookmark} alt='북마크' width={24} height={24} />
          )}
        </>
      )}
    </Button>
  );
};

export default BlenderBookmarkButton;
