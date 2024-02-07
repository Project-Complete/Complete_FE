import { Box, Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import classes from './DetailSummary.module.scss';
import heart from '@/assets/heart.svg';
import bookmark from '@/assets/bookmark.svg';
import StarScore from '../animation/StarScore';

const DetailSummary = () => {
  return (
    <Flex bg='gray' w={'100%'} py={92} justify={'center'} mb={'100px'}>
      <Flex w={'100%'} maw={1224} gap={'128px'} align={'center'}>
        <Flex
          bg='white'
          w={392}
          h={392}
          className={classes['drink-image']}
          justify={'center'}
          pt={30}
        >
          <Image src={'/beer.svg'} alt='맥주' width={438.72} height={625.58} />
        </Flex>
        <Flex direction='column' w={'100%'}>
          <Flex justify={'space-between'}>
            <Title size={40} fw={800} lh={'50px'}>
              트롤브루 레몬 라들러
            </Title>
            <Flex gap={24} align={'center'}>
              {/* TODO: design-system으로 교체 */}
              <button className={classes['share-button']}>
                <Box>공유하기</Box>
                <Image src={'/share.svg'} alt='share' width={24} height={24} />
              </button>
              <Image src={heart} alt='like' width={40} height={40} />
              <Image src={bookmark} alt='bookmark' width={40} height={40} />
            </Flex>
          </Flex>
          <Text
            className={classes['drink-description']}
            size='18px'
            lh={'32px'}
            fw={500}
            py={12}
          >
            유럽식 상큼한 레몬 향이 풍부하게 느껴지는 라들러
          </Text>
          <Flex className={classes['drink-description']} py={12}>
            <Text w={80} mr={24} size='20px' fw={600} lh={'32px'}>
              제조사
            </Text>
            <Text size='18px' lh={'32px'} fw={500}>
              트롤브루(Troll Brew)
            </Text>
          </Flex>
          <Flex py={12}>
            <Text w={80} mr={24} size='20px' fw={600} lh={'32px'}>
              유저 평가
            </Text>
            <Flex align={'center'}>
              <StarScore score={4.6} />
              <Text size='14px' fw={500} lh={'30px'} ml={3}>
                (4.6)
              </Text>
            </Flex>
          </Flex>
          <Flex gap={'8px'}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Text
                className={classes['drink-tag']}
                span
                lh={'30px'}
                bg={'white'}
                px={12}
                size='14px'
                fw={500}
                key={idx}
              >
                태그
              </Text>
            ))}
          </Flex>
          <Text size={'lg'} fw={600} lh={'32px'} mt={'24px'} mb={'12px'}>
            함께하면 좋은 안주
          </Text>
          <Flex gap={24}>
            {/* TODO: 추후 음식 이미지로 변경 필요 */}
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className={classes['drink-food-image-section']}
              ></div>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DetailSummary;
