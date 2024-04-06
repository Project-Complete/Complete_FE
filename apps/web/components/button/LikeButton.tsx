import { Button } from '@team-complete/complete-ui';
import Image from 'next/image';
import classes from './LikeButton.module.scss';
import { useState } from 'react';
import heart from '@/assets/heart.svg';

const LikeButton = () => {
  const [hoverState, setHoverState] = useState(false);
  return (
    <Button
      className={classes['like-button']}
      onMouseOver={() => {
        setHoverState(true);
      }}
      onMouseOut={() => {
        setHoverState(false);
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
};

export default LikeButton;
