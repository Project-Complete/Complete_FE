import { Badge, Box, Flex, Text } from '@mantine/core';
import RadarTasteChart from '../chart/RadarTasteChart';
import { DetailSimpleDrink } from '@/types/drinks';
import Image from 'next/image';
import { ChipButton } from '@team-complete/complete-ui';



const sortedDataFlavorFilter = [
  'body_rating',
  'bitter_rating',
  'refresh_rating',
  'sour_rating',
  'sweet_rating',
];

const Detail = ({ detailDrink }: { detailDrink: DetailSimpleDrink }) => {
  
  const sortedValues = sortedDataFlavorFilter.map(
    key => detailDrink.taste_statistic[key],
  );
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
    <Flex w={'100%'} direction={'column'}>
      <Text size='2.5rem' fw={800} lh={'xl2'}>
        칠러들의 칠링 노트
      </Text>
      <Flex w={'100%'} justify={'space-between'}>
        <Flex direction={'column'}>
          <Flex direction={'column'} mt={'3.5rem'}>
            <Text size={'xl2'} fw={600} lh={'lg'}>
              어떤 향이 느껴지나요?
            </Text>
            <Flex gap={8}>
              {detailDrink.flavor_statistics.map((e, index) => {
                return (
                  <ChipButton variant={'gray'} key={index}>
                    {e.flavor}
                  </ChipButton>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
        <Flex direction={'column'}>
          <Text size='xl2' fw={600} lh={'40px'}>
            어떤 맛이 느껴지나요?
          </Text>
          <Box py='1.5rem' px='3.31rem' w={'31rem'} h='25rem' fs='xl2'>
            <RadarTasteChart data={data} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Detail;
