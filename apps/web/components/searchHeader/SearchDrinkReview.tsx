'use client';
import AnotherDrinkListCard from '@/app/(withLayout)/drink/[detail]/(components)/(AnotherDrink)/Card';
import { Container, Flex } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { Fragment, useEffect } from 'react';
import cardListCss from '@/app/(withLayout)/drink/[detail]/(components)/(AnotherDrink)/List.module.scss';
import { useDrinkListQuery } from '@/hooks/queries/useDrinkListQuery';

type SearchDrinkReviewPropsType = {
  keyword: string;
};
const SearchDrinkReview = ({ keyword }: SearchDrinkReviewPropsType) => {
  const { data, fetchNextPage, hasNextPage } = useDrinkListQuery({
    keyword,
    drinkType: 'all'
  });
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.3,
  });
  useEffect(() => {
    if (entry && entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);

  const totalElements = data?.pages[0]?.page_info?.total_elements;

  return (
    <Container className={cardListCss['card-list-container']} >
      {totalElements !== undefined && (
        <Flex
          c={'h2'}
          lh={'40px'}
          fz={'28px'}
          fw={800}
          ref={ref}
        >{`"${keyword}"에 대 검색 결과 ${totalElements}개`}</Flex>
      )}
      <div className={cardListCss['card-list-wrapper']}>
        {data?.pages?.map((page, index) => {
          return (
            <Fragment key={index}>
              {page.drinks.map(drink => {
                return (
                  <AnotherDrinkListCard
                    key={drink.drink_id}
                    drink_id={drink.drink_id}
                    drink_like={drink.drink_like}
                    drink_name={drink.drink_name}
                    image_url={drink.image_url}
                    manufacturer_name={drink.manufacturer_name}
                    review_rating={drink.review_rating}
                    volume={drink.volume}
                  />
                );
              })}
            </Fragment>


          );
        })}
      </div>
    </Container >
  );
};
export default SearchDrinkReview;
