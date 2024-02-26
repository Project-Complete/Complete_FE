import { Box, Button, Center, Flex, Text, TextInput } from '@mantine/core';
import classes from './SearchBar.module.css';
import HeaderWriteButton from './WriteButton';

const HeaderCenterWrapper = () => {
  return (
    <Center w={`100%`} h={`100%`}>
      <Flex
        maw={`1224px`}
        justify={`space-between`}
        align={`center`}
        w={`100%`}
        h={`100%`}
      >
        <Box w={`11.5rem`} h={`5rem`}>
          Logo Image
        </Box>

        <Box
          h={`3.25rem`}
          w={`35rem`}
          px={`1rem`}
          py={`0.625rem`}
          bg={`#F2F3F3`}
          className={classes[`SearchBar-Wrapper`]}
        >
          <Flex w={`100%`} h={`100%`} align={`center`}>
            <Flex mr={`0.5rem`} w={`100%`} h={`100%`} align={`center`}>
              {/* 추후 맨틴의 autocomplete로 교체 -> 자동완성 기능 */}
              <TextInput
                w={`100%`}
                placeholder='원하시는 술 정보를 검색해보세요.'
                variant='unstyled'
              />
            </Flex>
            <Flex
              justify={`center`}
              align={`center`}
              w={`1.5rem`}
              h={`1.5rem`}
              ml={`auto`}
            >
              Q
            </Flex>
          </Flex>
        </Box>

        <Box>
          <Button
            component='a'
            href='/login'
            w={`7rem`}
            h={`2.75rem`}
            radius={`1.5rem`}
            px={`1.5rem`}
            variant={`outline`}
            color={`#BCC0C4`}
            mr={`1.5rem`}
          >
            <Text c={`#000`} size='0.875rem' w={`100%`} fw={600} ta='center'>
              소셜 로그인
            </Text>
          </Button>
          <HeaderWriteButton />
        </Box>
      </Flex>
    </Center>
  );
};

export default HeaderCenterWrapper;
