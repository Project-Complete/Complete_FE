import { Box, Flex } from '@mantine/core';
import DrinkListWrapper from './(components)/ListWrapper';

const DrinkPage = () => {
  return (
    <Flex mt={'1.5rem'} w={'100%'} justify={'center'}>
      <Flex w={'100%'} maw={'1224'}>
        <DrinkListWrapper />
      </Flex>
    </Flex>
  );
};

export default DrinkPage;
