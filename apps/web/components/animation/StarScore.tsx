import { Flex, Rating } from '@mantine/core';

type StarScorePropsType = {
  score: number;
};

const StarScore = ({ score }: StarScorePropsType) => {
  return (
    <Flex w={'100%'} h='100%' justify={'center'} align={'center'}>
      <Rating readOnly fractions={3} value={score} />
    </Flex>
  );
};

export default StarScore;
