'use client';
import { useMainSearchDrinkInfinityQuery } from '@/hooks/queries/useMainSearchDrinkInfinityQuery';
import { Flex } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useEffect } from 'react';

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

  const totalElements = data?.pages[0]?.page_info?.total_elements;

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
      {data?.pages.map((page, index) => {
        return (
          <>
            <div key={index}>
              {page.drinks.map(drink => {
                return <>{drink.drink_id}</>;
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};
export default SearchDrinkReview;
