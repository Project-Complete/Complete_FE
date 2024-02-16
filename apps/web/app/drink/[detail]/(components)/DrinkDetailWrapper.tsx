'use client';
import Detail from '@/components/drinkDetail/Detail';
import DetailDescription from '@/components/drinkDetail/DetailDescription';
import DetailSummary from '@/components/drinkDetail/DetailSummary';
import CustomerReview from '@/components/review/customerReview/CustomerReview';
import { Flex } from '@mantine/core';
import classes from './DetailPage.module.css';
import { useParams } from 'next/navigation';
import { useDrinkDetailQuery } from '@/hooks/queries/useDrinkDetailQuery';
import { DetailSimpleDrink, DetailSummarySimpleDrink } from '@/types/drinks';

const DrinkDetailWrapper = () => {
  const params = useParams();
  let detailId = params && params.detail ? params.detail : '1';
  if (
    params &&
    params.detail &&
    Array.isArray(params.detail) &&
    params.detail[0]
  ) {
    detailId = params.detail[0];
  }
  const { data } = useDrinkDetailQuery({ detailId: 1 });
  if (data) {
    const summaryDrink: DetailSummarySimpleDrink = {
      drink_id: data.drink_id,
      food_statistics: data.food_statistics,
      image_url: data.image_url,
      manufacturer: data.manufacturer,
      name: data.name,
      review_rating: data.review_rating,
      summary: data.summary,
    };

    const detailDrink: DetailSimpleDrink = {
      food_statistics: data.food_statistics,
      taste_statistic: data.taste_statistic,
      situation_statistic: data.situation_statistic,
      flavor_statistics: data.flavor_statistics,
    };

    return (
      <>
        <DetailSummary data={summaryDrink} />
        <Flex
          className={classes.DetailPageMainWrapper}
          w={'100%'}
          h={'100%'}
          maw={1224}
          align={'center'}
          direction={'column'}
        >
          <Detail detailDrink={detailDrink} />
          <DetailDescription />
          <CustomerReview />
        </Flex>
      </>
    );
  } else {
    return <div>로딩중...</div>;
  }
};

export default DrinkDetailWrapper;
