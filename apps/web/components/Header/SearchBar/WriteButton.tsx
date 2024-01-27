'use client';
import {
  Popover,
  Button,
  Text,
  Box,
  UnstyledButton,
  Flex,
} from '@mantine/core';

const HeaderWriteButton = () => {
  return (
    <Popover>
      <Popover.Target>
        <Button
          w={`5.5rem`}
          h={`2.75rem`}
          radius={`1.5rem`}
          px={`1.5rem`}
          bg={`#BCC0C4`}
        >
          <Text c={`#000`} size='0.875rem' w={`100%`} fw={600} ta='center'>
            글 쓰기
          </Text>
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Flex w={`11.5rem`} py={`0.5rem`} direction='column'>
          <Button
            fullWidth
            pl={0}
            justify={`start`}
            h={`2.215rem`}
            pr={`0.5rem`}
            py={`0.31rem`}
            bg={`none`}
          >
            <Text c={`#000`} size='0.875rem' w={`100%`} h={`1.5rem`}>
              술 리뷰
            </Text>
          </Button>
          <Button
            fullWidth
            pl={0}
            justify={`start`}
            h={`2.215rem`}
            pr={`0.5rem`}
            py={`0.31rem`}
            bg={`none`}
          >
            <Text c={`#000`} size='0.875rem' w={`100%`}>
              술끼리 안주끼리 조합
            </Text>
          </Button>
          <Button
            fullWidth
            pl={0}
            justify={`start`}
            h={`2.215rem`}
            pr={`0.5rem`}
            py={`0.31rem`}
            bg={`none`}
          >
            <Text c={`#000`} size='0.875rem' w={`100%`}>
              한잔 말아먹기
            </Text>
          </Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export default HeaderWriteButton;
