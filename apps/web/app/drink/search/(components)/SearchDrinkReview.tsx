import useMainSearchDrinkInfinityQuery from '@/hooks/queries/useMainSearchDrinkInfinityQuery';
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

  console.log('data',data)

  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.3,
  });
  useEffect(() => {
    if (entry && entry.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);
  console.log('data', data);

  return (
    <div>
      <Flex c={'h2'}>{`"${keyword}"에 대 검색 결과 ${'asdf'}개`}</Flex>
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
