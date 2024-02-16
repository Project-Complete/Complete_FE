import { Badge, Flex, Text } from '@mantine/core';
import RadarTasteChart from '../chart/RadarTasteChart';
import { DetailSimpleDrink } from '@/types/drinks';
import Image from 'next/image';

const drinkOccasionList = [
  { id: 'alone_sum', title: '나 혼자', selectedPeople: 0 },
  { id: 'friend_sum', title: '친구', selectedPeople: 0 },
  { id: 'partner_sum', title: '연인', selectedPeople: 0 },
  { id: 'business_sum', title: '비즈니스', selectedPeople: 0 },
  { id: 'adult_sum', title: '웃어른', selectedPeople: 0 },
];

const sortedDataFlavorFilter = [
  'body_rating',
  'bitter_rating',
  'refresh_rating',
  'sour_rating',
  'sweet_rating',
];

const Detail = ({ detailDrink }: { detailDrink: DetailSimpleDrink }) => {
  const updatedDrinkOccasionList = drinkOccasionList.map(item => {
    const situationStatisticValue = detailDrink.situation_statistic[item.id];
    return {
      ...item,
      selectedPeople:
        situationStatisticValue !== undefined ? situationStatisticValue : 0,
    };
  });
  const sortedValues = sortedDataFlavorFilter.map(
    key => detailDrink.taste_statistic[key],
  );
  console.log(sortedValues);
  console.log(detailDrink);
  const data = {
    labels: ['바디감(목넘김)', '쓴맛', '청량감', '산미', '단맛'],
    datasets: [
      {
        data: sortedValues as number[],
        borderColor: '#A589DF',
        borderWidth: 1,
      },
    ],
  };
  return (
    <Flex w={'100%'} gap={106} justify={'space-between'}>
      <Flex direction={'column'}>
        <Text size='xl'>칠러들의 칠링 노트</Text>
        <Text size='md'>누구랑 마시면 좋을까요?</Text>
        <Flex gap={24}>
          {updatedDrinkOccasionList.map(
            ({ id, title, selectedPeople }, index) => {
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
                    justify={'center'}
                    align={'center'}
                    pos={'relative'}
                  >
                    <Image
                      src={`/detail_who/${id}.svg`}
                      alt='title'
                      width={100}
                      height={100}
                    />
                  </Flex>
                  <Flex
                    direction={'column'}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text size='lg'>{title}</Text>
                    <Text size='md'>{selectedPeople}명</Text>
                  </Flex>
                </Flex>
              );
            },
          )}
        </Flex>
        <Flex direction={'column'}>
          <Text size={'lg'} fw={600} lh={'48px'}>
            어떤 향이 느껴지나요?
          </Text>
          <Flex gap={8}>
            {detailDrink.flavor_statistics.map((e, index) => {
              return (
                <Badge key={index} h={48} fz={18}>
                  {e.flavor}
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
        <RadarTasteChart data={data} />
      </Flex>
    </Flex>
  );
};
export default Detail;
