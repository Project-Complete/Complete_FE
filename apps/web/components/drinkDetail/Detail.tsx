'use client';
import { Badge, Flex, Text } from '@mantine/core';
import RaderTasteChart from '../chart/RaderTasteChart';

const drinkOccasionList = [
  { title: '나 혼자', selectedPeople: 0 },
  { title: '비즈니스', selectedPeople: 0 },
  { title: '웃어', selectedPeople: 0 },
  { title: '연', selectedPeople: 0 },
  { title: '친구', selectedPeople: 0 },
];

const Detail = () => (
  <Flex>
    <Flex>
      <Text component='h1'>칠러들의 칠링 노트</Text>
      <Flex>누구랑 마시면 좋을까요?</Flex>
      <Flex direction={'column'}>
        {drinkOccasionList.map(({ title, selectedPeople }, index) => {
          return (
            <Flex key={index} direction={'row'}>
              <Flex w={100} h={100} style={{ border: '1px solid black' }}>
                대충 그림
              </Flex>
              <Flex>{title}</Flex>
              <Flex>{selectedPeople}</Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
    <Flex>
      <Flex>어떤 향이 느껴지나요?</Flex>
      <Flex>
        <Badge>향</Badge>
        <Badge>향</Badge>
        <Badge>향</Badge>
      </Flex>
    </Flex>
    <Flex>
      <Flex>어떤 맛이 느껴지나요?</Flex>
      <RaderTasteChart />
    </Flex>
  </Flex>
);
export default Detail;
