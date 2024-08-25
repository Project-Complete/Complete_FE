'use client';
import AnotherDrinkListCard from '@/app/(withLayout)/drink/[detail]/(components)/(AnotherDrink)/Card';
import { useDrinkListQuery } from '@/hooks/queries/useDrinkListQuery';
import { Container, Flex } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useEffect, Fragment } from 'react';
import cardListCss from '@/app/(withLayout)/drink/[detail]/(components)/(AnotherDrink)/List.module.scss';
import { useCombinationSearchInfinityQuery } from '@/hooks/queries/useCombinationSearchInfinityQuery';

type SearchChillingPropsType = {
  keyword: string;
};
const SearchChilling = ({ keyword }: SearchChillingPropsType) => {
  const { data, fetchNextPage, hasNextPage } = useCombinationSearchInfinityQuery({
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
              {
                page.combinations.map(combination => {
                  return (
                    <AnotherDrinkListCard
                      key={combination.drink_id}
                      drink_id={combination.drink_id}
                      drink_like={combination.drink_like}
                      drink_name={combination.drink_name}
                      image_url={combination.image_url}
                      manufacturer_name={combination.manufacturer_name}
                      review_rating={combination.review_rating}
                      volume={combination.volume}
                    />
                  );
                })
              }
            </Fragment>
          );
        })}
      </div>
    </Container >
  );
};
export default SearchChilling;
