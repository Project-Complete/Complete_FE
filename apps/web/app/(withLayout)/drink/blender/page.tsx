import { Flex } from '@mantine/core';
import Blender from './(component)/Blender';


export default function Page(): JSX.Element {
  return <Flex justify={'center'} py={32}>
    <Blender />
  </Flex>
}
