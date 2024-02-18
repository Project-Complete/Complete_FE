'use client';

import { Box, Flex, Text } from '@mantine/core';
import { ChipButton } from '@team-complete/complete-ui';
const AnotherDrink = ({
  anotherDrinkRef,
}: {
  anotherDrinkRef: React.RefObject<HTMLHeadingElement> | null;
}) => {
  return (
    <Box w={'100%'} h={500}>
      <Flex justify={'space-between'} w={'100%'}>
        <Text
          component='h1'
          lh={'40px'}
          fz={'28px'}
          fw={800}
          ref={anotherDrinkRef}
        >
          비슷한 평가를 받은 주류를 알려드릴게요!
        </Text>
        <Box>
          <ChipButton variant={'primary'}>누구랑</ChipButton>
          <ChipButton variant={'primary'}>맛</ChipButton>
          <ChipButton variant={'primary'}>향</ChipButton>
        </Box>
      </Flex>
    </Box>
  );
};

export default AnotherDrink;
