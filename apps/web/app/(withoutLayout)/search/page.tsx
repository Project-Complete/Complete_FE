'use client';
import {
  Button,
  CloseButton,
  Divider,
  Flex,
  Select,
  Tabs,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Autocomplete } from '@mantine/core';
import Image from 'next/image';
import MainDrinkContent from '@/components/review/mainDrink/MainDrinkContent';
import { useSearchParams } from 'next/navigation';
import { useDebouncedState, useDebouncedValue } from '@mantine/hooks';
import DefaultSearchView from '../../../components/searchHeader/DefaultSearchView';
import { Tab, TabList } from '@team-complete/complete-ui';
import { useState } from 'react';
import tabClasses from './tab.module.scss';
import containerCss from './container.module.scss';
import SearchDrinkReview from '../../../components/searchHeader/SearchDrinkReview';
import SearchChilling from '../../../components/searchHeader/SearchChilling';
import SearchCommunity from '../../../components/searchHeader/SearchCommunity';

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
  const [debouncedKeyword] = useDebouncedValue(form.values.keyword, 300);
  const [tabType, setTabType] = useState<SearchTabType>(
    tabTypeParam as SearchTabType,
  );
  const isEmptyKeyword = debouncedKeyword.length === 0;

  const handleClearKeyword = () => {
    form
      .getInputProps('searchKeyword', {
        fieldType: 'searchAutocomplete',
      })
      .onChange('');
  };
  return (
    <>
      <Flex classNames={containerCss}>
        <Flex w={'100%'} gap={12} h={80} justify={'center'} align={'center'}>
          <Image
            src={'/logo/symbol.svg'}
            alt={'symbol'}
            width={40}
            height={40}
          />
          <Autocomplete
            height={48}
            variant='chilling-search'
            w={'100%'}
            data={['React', 'Angular', 'Vue', 'Svelte']}
            {...form.getInputProps('keyword', {
              fieldType: 'searchAutocomplete',
            })}
            rightSection={
              <CloseButton
                display={isEmptyKeyword ? 'none' : 'block'}
                icon={
                  <Image
                    src={'/icons/cancel_filled.svg'}
                    alt={'cancel'}
                    width={24}
                    height={24}
                  />
                }
                onClick={handleClearKeyword}
              />
            }
          />
          <Flex h={48} justify={'center'} align={'center'}>
            <Button bg={'none'} c={'gray'} onClick={handleClearKeyword}>
              취소
            </Button>
          </Flex>
        </Flex>
        <Flex pb={2}>
          <Divider pos={'absolute'} left={0} right={0} />
        </Flex>
        <Flex w={'100%'} h={'100%'}>
          {isEmptyKeyword ? (
            <Flex mt={24} w={'100%'} direction={'column'}>
              <DefaultSearchView />
              <MainDrinkContent drinkType={'all'} />
            </Flex>
          ) : (
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
          )}
        </Flex>
      </Flex>
    </>
  );
}
