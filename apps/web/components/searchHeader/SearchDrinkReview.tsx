'use client';
import AnotherDrinkListCard from '@/app/(withLayout)/drink/[detail]/(components)/(AnotherDrink)/Card';
import { useMainSearchDrinkInfinityQuery } from '@/hooks/queries/useMainSearchDrinkInfinityQuery';
import { Flex } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useEffect } from 'react';
import cardListCss from '@/app/(withLayout)/drink/[detail]/(components)/(AnotherDrink)/List.module.scss';

type SearchDrinkReviewPropsType = {
  keyword: string;
};
const SearchDrinkReview = ({ keyword }: SearchDrinkReviewPropsType) => {
  const { data, fetchNextPage, hasNextPage } = useMainSearchDrinkInfinityQuery({
    keyword,
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

  const totalElements = data?.pages[0]?.search_drinks.page_info?.total_elements;

  return (
    <div>
      {totalElements !== undefined && (
        <Flex
          c={'h2'}
          lh={'40px'}
          fz={'28px'}
          fw={800}
          ref={ref}
        >{`"${keyword}"에 대 검색 결과 ${totalElements}개`}</Flex>
      )}
      <h1>SearchDrinkReview</h1>
      {data?.pages?.map((page, index) => {
        return (
          <>
            <div key={index} className={cardListCss['card-list-wrapper']}>
              {page.search_drinks.drinks.map(drink => {
                return (
                  <AnotherDrinkListCard
                    key={drink.drink_id}
                    drink_id={drink.drink_id}
                    drink_like={drink.drink_like}
                    drink_name={drink.drink_name}
                    image_url={drink.image_url}
                    manufacturer_name={drink.manufacturer_name}
                    review_rating={drink.review_rating}
                  />
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};
export default SearchDrinkReview;
