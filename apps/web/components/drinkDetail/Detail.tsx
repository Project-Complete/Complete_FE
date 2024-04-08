import { Badge, Box, Flex, Text } from '@mantine/core';
import RadarTasteChart from '../chart/RadarTasteChart';
import { DetailSimpleDrink } from '@/types/drinks';
import Point from '@/assets/Point';
import classes from './Detail.module.scss';
import DetailFlavorChip from './DetailFlavorChip';

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
  const sortedDetailDrink = detailDrink.flavor_statistics
    .sort((a, b) => {
      return -(a.count - b.count);
    })
    .splice(0, 3);

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
    <Flex w={'100%'} direction={'column'} bg={'#FAFAFA'}>
      <Flex align={`center`} gap={'1.5rem'}>
        <Point />
        <Text size='2rem' fw={800} lh={'xl2'}>
          칠러들의 칠링 노트
        </Text>
      </Flex>
      <Flex w={'100%'} justify={'space-between'} mt={'3.5rem'}>
        <Flex className={classes['smell-taste-box']}>
          <Flex w={'100%'} direction={'column'}>
            <Text size={'xl'} fw={600} lh={'lg'}>
              어떤 향이 느껴지나요?
            </Text>
            <Flex w={'100%'} direction={'column'} gap={16}>
              {sortedDetailDrink && sortedDetailDrink[0] && (
                <DetailFlavorChip index={1} flavor={sortedDetailDrink[0]} />
              )}
              {sortedDetailDrink && sortedDetailDrink[1] && (
                <DetailFlavorChip index={2} flavor={sortedDetailDrink[1]} />
              )}
              {sortedDetailDrink && sortedDetailDrink[2] && (
                <DetailFlavorChip index={3} flavor={sortedDetailDrink[2]} />
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex className={classes['smell-taste-box']}>
          <Text size='xl' fw={600} lh={'40px'}>
            어떤 맛이 느껴지나요?
          </Text>
          <Flex
            justify={'center'}
            py='1.5rem'
            px='3.31rem'
            w={'100%'}
            h='25rem'
            fs='xl2'
          >
            <RadarTasteChart data={data} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Detail;
