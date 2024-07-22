import { Flex } from '@mantine/core';
import BlenderListWrapper from './(component)/ListWrapper';

const BlenderListPage = () => {
  return (
    <Flex w={'100%'} h={'100%'} mih={'50vh'} justify={'center'}>
      <Flex maw={'1224px'} w={'100%'} h={'100%'}>
        <BlenderListWrapper />
      </Flex>
    </Flex>
  );
};

export default BlenderListPage;
