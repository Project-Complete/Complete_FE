'use client';
import { Button, Flex, Select, Tabs } from '@mantine/core';
import containerCss from './container.module.scss';
import { useForm } from '@mantine/form';
import useMainSearchDrinkInfinityQuery from '@/hooks/queries/useMainSearchDrinkInfinityQuery';

import { Autocomplete } from '@mantine/core';
import Image from 'next/image';
import MainDrinkContent from '@/components/review/mainDrink/MainDrinkContent';
import { useSearchParams } from 'next/navigation';
import { useDebouncedState, useDebouncedValue } from '@mantine/hooks';
import DefaultSearchView from './DefaultSearchView';
import { Tab, TabList } from '@team-complete/complete-ui';
import { useState } from 'react';
import tabClasses from './tab.module.scss';
import SearchDrinkReview from './(components)/SearchDrinkReview';
import SearchChilling from './(components)/SearchChilling';
import SearchCommunity from './(components)/SearchCommunity';

type SearchTabType = 'drinkReview' | 'chilling' | 'community';

export default function Page(): JSX.Element {
  const searchParams = useSearchParams();
  const keywordParam = searchParams?.get('keyword') || '';
  const tabTypeParam = searchParams?.get('tabType') || 'drinkReview';
  const form = useForm({
    initialValues: { keyword: keywordParam, tabType: tabTypeParam },
    enhanceGetInputProps: (payload: any) => {
      if (payload.options.fieldType === 'searchAutocomplete') {
        return {
          placeholder: '찾는 주류가 있으신가요?',
          onChange: (payload: string) => form.setFieldValue('keyword', payload),
        };
      }
      return {};
    },
    validate: {
      keyword: (value: string) =>
        value.length < 1 ? '한 글자 이상 입력해주세요' : null,
    },
  });
  const [debouncedKeyword] = useDebouncedValue(form.values.keyword, 500);
  const [tabType, setTabType] = useState<SearchTabType>(
    tabTypeParam as SearchTabType,
  );

  return (
    <>
      <Flex classNames={containerCss}>
        <Flex w={'100%'}>
          <Autocomplete
            defaultValue={keywordParam}
            leftSection={
              <Image
                src={'/icons/돋보기.svg'}
                alt={'돋보기'}
                width={16}
                height={16}
              />
            }
            w={'100%'}
            data={['React', 'Angular', 'Vue', 'Svelte']}
            {...form.getInputProps('searchKeyword', {
              fieldType: 'searchAutocomplete',
            })}
          />
          <Flex>
            <Button bg={'none'} c={'gray'}>
              취소
            </Button>
          </Flex>
        </Flex>
        {debouncedKeyword.length === 0 ? (
          <>
            <DefaultSearchView />
            <MainDrinkContent drinkType={'all'} />
          </>
        ) : (
          <>
            <Tabs
              w={1240}
              defaultValue={tabType}
              onChange={v => {
                if (v === null) return;
                setTabType(v as SearchTabType);
              }}
              classNames={tabClasses}
            >
              <TabList w={350} style={{ justifySelf: 'center' }}>
                <Tab value='drinkReview'>주류 리뷰</Tab>
                <Tab value='chilling'>본격적 칠링</Tab>
                <Tab value='community'>커뮤니티</Tab>
              </TabList>
              <Tabs.Panel value='drinkReview'>
                <SearchDrinkReview keyword={debouncedKeyword} />
              </Tabs.Panel>
              <Tabs.Panel value='chilling'>
                <SearchChilling keyword={debouncedKeyword} />
              </Tabs.Panel>
              <Tabs.Panel value='community'>
                <SearchCommunity keyword={debouncedKeyword} />
              </Tabs.Panel>
            </Tabs>
          </>
        )}
      </Flex>
    </>
  );
}
