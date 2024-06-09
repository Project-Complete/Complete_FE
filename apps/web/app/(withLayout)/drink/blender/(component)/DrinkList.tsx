import { Rating } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import classes from './DrinkListCard.module.scss';
import LikeButton from '@/components/button/LikeButton';

const BlenderDrinkListCard = ({
  drink_id,
  drink_like,
  drink_name,
  image_url,
  manufacturer_name,
}: Omit<DetailRecommendDrink, 'review_rating'>) => {
  console.log(image_url);
  return (
    <div className={classes['card-wrapper']}>
      {/* 이미지 부분 */}
      <Link href={`/drink/${drink_id}`} className={classes['card-image']}>
        <Image
          src={
            image_url === 'imageUrl' || image_url === null
              ? 'https://picsum.photos/392/288.webp'
              : image_url
          }
          alt='주류 이미지'
          fill
        />
      </Link>
      <div className={classes['card-content-wrapper']}>
        {/* 제조사 */}
        <div className={classes['card-content-manu-like']}>
          <div className={classes['card-content-manu']}>
            {manufacturer_name}
          </div>
          <div className={classes['card-content-drinkname']}>{drink_name}</div>
        </div>
        <div className={classes['card-content-like']}>
          <LikeButton
            drink_like={drink_like}
            drink_id={drink_id ? drink_id : 0}
            isMyPage={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BlenderDrinkListCard;
