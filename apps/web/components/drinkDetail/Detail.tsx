'use client';
import { Badge, Flex, Text } from '@mantine/core';
import RadarTasteChart from '../chart/RadarTasteChart';

const drinkOccasionList = [
  { title: '나 혼자', selectedPeople: 0 },
  { title: '비즈니스', selectedPeople: 0 },
  { title: '웃어', selectedPeople: 0 },
  { title: '연', selectedPeople: 0 },
  { title: '친구', selectedPeople: 0 },
];

const Detail = () => (
  <Flex w={'100%'} gap={106}>
    <Flex direction={'column'}>
      <Text size='xl'>칠러들의 칠링 노트</Text>
      <Text size='md'>누구랑 마시면 좋을까요?</Text>
      <Flex gap={24}>
        {drinkOccasionList.map(({ title, selectedPeople }, index) => {
          return (
            <Flex
              key={index}
              direction={'column'}
              justify={'center'}
              align={'center'}
            >
              <Flex
                w={100}
                h={120}
                style={{ border: '1px solid black' }}
                justify={'center'}
                align={'center'}
              >
                대충 그림
              </Flex>
              <Flex direction={'column'} justify={'center'} align={'center'}>
                <Text size='lg'>{title}</Text>
                <Text size='md'>{selectedPeople}명</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Flex direction={'column'}>
        <Text size={'lg'} fw={600} lh={'48px'}>
          어떤 향이 느껴지나요?
        </Text>
        <Flex gap={8}>
          {Array.from({ length: 3 }).map((_, index) => {
            return (
              <Badge key={index} w={64} h={48} fz={18}>
                향
              </Badge>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
    <Flex direction={'column'}>
      <Text fw={600} lh={'40px'}>
        어떤 맛이 느껴지나요?
      </Text>
      <RadarTasteChart />
    </Flex>
  </Flex>
);
export default Detail;
