'use cilent';

import { useAnotherDrinkListQuery } from '@/hooks/queries/useAnotherDrinkListQuery';
import classes from './List.module.scss';
import AnotherDrinkListCard from './Card';

const AnotherDrinkList = ({
  detailId,
  rateName,
}: {
  detailId: number;
  rateName: 'situation' | 'taste' | 'flavor';
}) => {
  const { data, isLoading } = useAnotherDrinkListQuery({ detailId, rateName });
  if (isLoading) {
    return <div>로딩중...</div>;
  } else if (data && data.drinks) {
    const drinks = data.drinks;
    return (
      <div className={classes['card-list-wrapper']}>
        {drinks.map(e => (
          <AnotherDrinkListCard
            key={e.drink_id}
            drink_id={e.drink_id}
            drink_like={e.drink_like}
            drink_name={e.drink_name}
            image_url={e.image_url}
            manufacturer_name={e.manufacturer_name}
            review_rating={e.review_rating}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default AnotherDrinkList;
