'use client';
import StarScore from '@/components/animation/StarScore';
import { Divider, Flex, Grid, Text } from '@mantine/core';
import Image from 'next/image';

const CustomerReview = () => {
  return (
    <Flex direction={'column'} w={'100%'}>
      <Text component='h2' lh={'40px'} fz={'28px'} fw={800}>
        칠러들의 솔직한 리뷰
      </Text>
      <Grid w={'100%'} gutter={24} mt={24} mb={24}>
        {new Array(6).fill(null).map((v, index) => {
          return (
            <Grid.Col key={index} w={'100%'} span={{ base: 6, sm: 4 }}>
              <Flex gap={16} direction={'column'}>
                <Flex
                  w={'100%'}
                  pb={'73.4%'}
                  pos={'relative'}
                  style={{ boxShadow: '0px 4px 20px 0px #00000033' }}
                >
                  <Image
                    src={'https://picsum.photos/392/288.webp'}
                    sizes='512px'
                    fill
                    style={{
                      objectFit: 'contain',
                      borderRadius: '12px',
                    }}
                    alt={'image'}
                  />
                  <Flex
                    pos={'absolute'}
                    right={10}
                    bottom={0}
                    w={72}
                    h={72}
                    p={10}
                    bg={'white'}
                    style={{
                      boxshadow: '0px 4px 20px 0px #00000033',
                      transform: 'translate(0, 50%)',
                      borderRadius: '100%',
                    }}
                  >
                    <Flex
                      w={'100%'}
                      h={'100%'}
                      bg={'gray'}
                      style={{ borderRadius: '100%' }}
                    ></Flex>
                  </Flex>
                </Flex>
                <Flex gap={10}>
                  <Text>김성호</Text>
                  <Divider orientation='vertical' />
                  <Text>2023.01.19</Text>
                </Flex>
                <StarScore score={4.5} />
              </Flex>
            </Grid.Col>
          );
        })}
      </Grid>
    </Flex>
  );
};
export default CustomerReview;
