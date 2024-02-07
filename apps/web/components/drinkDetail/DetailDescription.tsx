'use client';
import { Flex, Table, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React, { useMemo } from 'react';

interface Package {
  [key: string]: string;
}

type CategoryType = '용량' | '도수' | '유형' | '패키지' | '생산지역';

interface PackageDetailType {
  category: '용량';
  content: Package;
}

interface DetailType {
  category: Exclude<CategoryType, '용량'>;
  content: string;
}

type DrinkDetailType = PackageDetailType | DetailType;

const drinkDetail: DrinkDetailType[] = [
  {
    category: '용량',
    content: {
      package1: '360ml',
      package2: '500ml',
      package3: '473ml',
      package4: '571ml',
      package5: '750ml',
    },
  },
  { category: '도수', content: '용량' },
  { category: '유형', content: '용량' },
  { category: '패키지', content: '용량' },
  { category: '생산지역', content: '용량' },
];

const DetailDescription = () => {
  const filteredContent = useMemo(() => {
    const content = drinkDetail[0]?.content as Package;
    const contentKeys = Object.keys(content);

    const arr: string[][] = Array.from(
      { length: Math.ceil(contentKeys.length / 2) },
      () => [],
    );

    for (let i = 0; i < contentKeys.length; i++) {
      const key = contentKeys[i];
      if (key === undefined) continue;

      const value = content[key];
      if (value === undefined) continue;

      arr[Math.floor(i / 2)]?.push(key);
      arr[Math.floor(i / 2)]?.push(value);
    }

    return arr;
  }, [drinkDetail[0]?.content]);
  return (
    <Flex w={'100%'} direction={'column'} py={'72px'}>
      <Title size={40} fw={800} lh={'50px'} mb={'25px'}>
        유럽식 레몬 라들러 스타일 기반 과일맥주
      </Title>
      <Text mb={'48px'}>
        만하임 지방 울창한 숲 속의 신비한 생명체인 트롤(Troll)의 레시피로 만든
        과일맥주라는
        <br /> 독특한 브랜드 컨셉을 가지고 있어요. 독일 만하임 지역 최대 규모의
        브루어리인 아이쉬바움(Eichbaum)이
        <br /> 새로이 개발한 신개념 과일맥주로, 낮은 알코올 도수 속에서 달콤한
        과일 미감과 청량감이 특징이에요.
        <br /> 유럽 현지는 물론 중국에서도 캐쥬얼 드링크를 찾는 젊은 연령층
        소비자들에게 큰 호응을 얻고있어요.
      </Text>
      <Table>
        <Table.Tbody>
          {drinkDetail.map(detailItem => {
            return detailItem.category !== '용량' ? (
              <Table.Tr key={detailItem.category}>
                <Table.Td w={'15%'}>{detailItem.category}</Table.Td>
                <Table.Td>{detailItem.content}</Table.Td>
              </Table.Tr>
            ) : (
              filteredContent.map((contentItem, idx) => {
                return (
                  <Table.Tr key={detailItem.category + idx}>
                    {idx === 0 && (
                      <Table.Td
                        rowSpan={Math.ceil(
                          Object.keys(detailItem.content).length / 2,
                        )}
                        w={'15%'}
                      >
                        {detailItem.category}
                      </Table.Td>
                    )}
                    {contentItem.map((el, idx) => {
                      return idx % 2 === 0 ? (
                        <Table.Td key={el + idx} w={'80px'}>
                          {el}
                        </Table.Td>
                      ) : (
                        <Table.Td key={el + idx}>
                          <Flex align={'center'} gap={24}>
                            <Image
                              src={'/bottle.svg'}
                              alt='package'
                              width={80}
                              height={80}
                            />
                            {el}
                          </Flex>
                        </Table.Td>
                      );
                    })}
                  </Table.Tr>
                );
              })
            );
          })}
        </Table.Tbody>
      </Table>
    </Flex>
  );
};

export default DetailDescription;
