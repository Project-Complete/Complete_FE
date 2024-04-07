'use client';
import Detail from '@/components/drinkDetail/Detail';
import DetailDescription from '@/components/drinkDetail/DetailDescription';
import DetailSummary from '@/components/drinkDetail/DetailSummary';
import CustomerReview from '@/components/review/customerReview/CustomerReview';
import { Flex } from '@mantine/core';
import classes from './DetailPage.module.scss';
import { useParams } from 'next/navigation';
import { useDrinkDetailQuery } from '@/hooks/queries/useDrinkDetailQuery';
import {
  DetailDescriptionDrink,
  DetailSimpleDrink,
  DetailSummarySimpleDrink,
} from '@/types/drinks';
import { Tabs, Tab, TabList } from '@team-complete/complete-ui';
import AnotherDrink from './(AnotherDrink)/AnotherDrink';
import { useEffect, useRef, useState } from 'react';
import useScroll from '@/hooks/useScroll';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const DrinkDetailWrapper = ({
  accessToken,
  refreshToken,
}: {
  accessToken: RequestCookie | undefined;
  refreshToken: RequestCookie | undefined;
}) => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<string | null>('상세 정보');
  const { moveToSection } = useScroll();
  const descriptionRef = useRef<HTMLHeadingElement | null>(null);
  const anotherDrinkRef = useRef<HTMLHeadingElement | null>(null);
  const customerReviewRef = useRef<HTMLHeadingElement | null>(null);

  let detailId = '1';
  if (
    params &&
    params.detail &&
    Array.isArray(params.detail) &&
    params.detail[0]
  ) {
    detailId = params.detail[0];
  } else if (params && params.detail && !Array.isArray(params.detail)) {
    detailId = params.detail;
  }
  const { data } = useDrinkDetailQuery({ detailId: parseInt(detailId) });
  if (data) {
    const summaryDrink: DetailSummarySimpleDrink = {
      drink_id: data.drink_id,
      drink_like: data.drink_like,
      food_statistics: data.food_statistics,
      image_url: data.image_url,
      manufacturer: data.manufacturer,
      name: data.name,
      review_rating: data.review_rating,
      summary: data.summary,
      situation_statistic: data.situation_statistic,
    };

    const detailDrink: DetailSimpleDrink = {
      food_statistics: data.food_statistics,
      taste_statistic: data.taste_statistic,
      flavor_statistics: data.flavor_statistics,
    };
    const detailDescription: DetailDescriptionDrink = {
      title: data.title,
      description: data.description,
      packages: data.packages,
      abv: data.abv,
      manufacturer: data.manufacturer,
      type: data.type,
    };

    useEffect(() => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9,
      };
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === descriptionRef.current) {
              setActiveTab('상세 정보');
              // 여기서 description 요소가 화면의 중앙에 있을 때 실행할 작업을 수행
            } else if (entry.target === anotherDrinkRef.current) {
              setActiveTab('비슷한 평가의 주류');
              // 여기서 another drink 요소가 화면의 중앙에 있을 때 실행할 작업을 수행
            } else if (entry.target === customerReviewRef.current) {
              setActiveTab('칠러들의 리뷰');
              // 여기서 customer review 요소가 화면의 중앙에 있을 때 실행할 작업을 수행
            }
          }
        });
      }, options);

      if (descriptionRef.current) {
        observer.observe(descriptionRef.current);
      }

      if (anotherDrinkRef.current) {
        observer.observe(anotherDrinkRef.current);
      }
      if (customerReviewRef.current) {
        observer.observe(customerReviewRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }, []);

    return (
      <>
        <DetailSummary
          data={summaryDrink}
          accessToken={accessToken}
          refreshToken={refreshToken}
        />
        <Flex
          className={classes.DetailPageMainWrapper}
          w={'100%'}
          h={'100%'}
          maw={1224}
          align={'center'}
          direction={'column'}
        >
          <Detail detailDrink={detailDrink} />
          <Flex
            justify={'center'}
            w={'100vw'}
            bg={'#FFF'}
            pos={'sticky'}
            top={60}
            className={classes['detail-page-tab-z-index']}
          >
            <Tabs
              value={activeTab}
              onChange={setActiveTab}
              w={'100%'}
              className={classes['detail-age-tab-max-width']}
            >
              <TabList>
                <Tab
                  value='상세 정보'
                  onClick={() => {
                    moveToSection(descriptionRef);
                  }}
                >
                  상세 정보
                </Tab>
                <Tab
                  value='비슷한 평가의 주류'
                  onClick={() => {
                    moveToSection(anotherDrinkRef);
                  }}
                >
                  비슷한 평가의 주류
                </Tab>
                <Tab
                  value='칠러들의 리뷰'
                  onClick={() => {
                    moveToSection(customerReviewRef);
                  }}
                >
                  칠러들의 리뷰
                </Tab>
              </TabList>
            </Tabs>
          </Flex>
          <DetailDescription
            detailDescription={detailDescription}
            descriptionRef={descriptionRef}
          />
          <AnotherDrink
            anotherDrinkRef={anotherDrinkRef}
            detailId={parseInt(detailId)}
          />
          <CustomerReview
            customerReviewRef={customerReviewRef}
            detailId={parseInt(detailId)}
          />
        </Flex>
      </>
    );
  } else {
    return <div>로딩중...</div>;
  }
};

export default DrinkDetailWrapper;
