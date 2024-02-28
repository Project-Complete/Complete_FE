import { DetailRecommendDrink } from '@/types/drinks';
import { Rating } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import classes from './Card.module.scss';

const AnotherDrinkListCard = ({
  drink_id,
  drink_like,
  drink_name,
  image_url,
  manufacturer_name,
  review_rating,
}: DetailRecommendDrink) => {
  return (
    <Link href={`/drink/${drink_id}`} className={classes['card-wrapper']}>
      {/* 이미지 부분 */}
      <div className={classes['card-image']}>
        <Image
          src={'https://picsum.photos/392/288.webp'}
          alt='주류 이미지'
          fill
        />
      </div>
      <div className={classes['card-content-wrapper']}>
        {/* 제조사 */}
        <div className={classes['card-content-manu-like']}>
          <div className={classes['card-content-manu']}>
            {manufacturer_name}
          </div>
          <div className={classes['card-content-like']}>
            {drink_like ? (
              <Image src='/icons/like_fill.svg' alt='좋아요' fill></Image>
            ) : (
              <Image src='/icons/like.svg' alt='좋아요' fill></Image>
            )}
          </div>
        </div>
        <div className={classes['card-content-drinkname']}>{drink_name}</div>
        <div className={classes['card-content-rating']}>
          <Rating defaultValue={review_rating} fractions={2} readOnly />
        </div>
      </div>
    </Link>
  );
};

export default AnotherDrinkListCard;
