import { Flex, Box } from '@mantine/core';
import containerCss from './container.module.scss';
import LoginButton from '@/components/login/LoginButton';

export default function Page(): JSX.Element {
  return (
    <>
      <Flex classNames={containerCss}>
        <Box w={600} h={200}>
          asdf
        </Box>
        <LoginButton />
        <Flex>궁금하신 사항 있으신가요?</Flex>
      </Flex>
    </>
  );
}
