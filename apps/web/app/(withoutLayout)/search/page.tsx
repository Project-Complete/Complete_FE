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
import { usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedState, useDebouncedValue } from '@mantine/hooks';
import DefaultSearchView from '../../../components/searchHeader/DefaultSearchView';
import { Tab, TabList } from '@team-complete/complete-ui';
import { useCallback, useState } from 'react';
import tabClasses from './tab.module.scss';
import containerCss from './container.module.scss';
import SearchDrinkReview from '../../../components/searchHeader/SearchDrinkReview';
import SearchChilling from '../../../components/searchHeader/SearchChilling';
import SearchCommunity from '../../../components/searchHeader/SearchCommunity';
import useRecentSearches from '@/hooks/useRecentSearches';
import { produce } from 'immer';
import { useRouter } from 'next/navigation';

type SearchTabType = 'drinkReview' | 'chilling' | 'community';

export default function Page(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const keywordParam = searchParams?.get('keyword') || '';
  const tabTypeParam = searchParams?.get('tabType') || 'drinkReview';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { keyword: keywordParam, tabType: tabTypeParam },
    enhanceGetInputProps: payload => {
      if (payload.options.fieldType === 'searchAutocomplete') {
        return {
          placeholder: '찾는 주류가 있으신가요?',
          onChange: (payload: string) => form.setFieldValue('keyword', payload),
        };
      }
      return {};
    },
    validate: {
      // keyword: (value: string) =>
      //   value.length < 1 ? '한 글자 이상 입력해주세요' : null,
    },
  });

  const [tabType, setTabType] = useState<SearchTabType>(
    tabTypeParam as SearchTabType,
  );

  const [submittedValues, setSubmittedValues] = useState<typeof form.values>(
    form.values,
  );
  const isEmptyKeyword = submittedValues?.keyword.length === 0;

  const { recentSearches, deleteRecentSearch, setRecentSearches } =
    useRecentSearches();

  return (
    <>
      <form
        onSubmit={form.onSubmit((data, event) => {
          setSubmittedValues(data);
        })}
      >
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
              value={form.getValues().keyword}
              data={recentSearches}
              {...form.getInputProps('keyword', {
                fieldType: 'searchAutocomplete',
              })}
              onOptionSubmit={(value: string) => {
                router.push(
                  pathname + '?' + createQueryString('keyword', value),
                );
                form.setFieldValue('keyword', value);
                setSubmittedValues(
                  produce(prev => {
                    prev.keyword = value;
                  }),
                );
              }}
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
                  onClick={() => {
                    router.push(
                      pathname + '?' + createQueryString('keyword', ''),
                    );
                    form.setFieldValue('keyword', '');
                    setSubmittedValues(
                      produce(prev => {
                        prev.keyword = '';
                      }),
                    );
                  }}
                  type='submit'
                />
              }
            />
            <Flex h={48} justify={'center'} align={'center'}>
              <Button
                bg={'none'}
                c={'gray'}
                onClick={() => {
                  router.push(
                    pathname +
                      '?' +
                      createQueryString('keyword', form.getValues().keyword),
                  );
                }}
                type='submit'
              >
                검색
              </Button>
            </Flex>
          </Flex>
          <Flex pb={2}>
            <Divider pos={'absolute'} left={0} right={0} />
          </Flex>
          <Flex w={'100%'} h={'100%'}>
            {isEmptyKeyword ? (
              <Flex mt={24} w={'100%'} direction={'column'}>
                <DefaultSearchView
                  recentSearches={recentSearches}
                  deleteRecentSearch={deleteRecentSearch}
                />
                <MainDrinkContent drinkType={'all'} />
              </Flex>
            ) : (
              <Tabs
                w={1240}
                defaultValue={tabType}
                onChange={v => {
                  if (v === null) return;
                  setTabType(v as SearchTabType);
                  router.push(pathname + '?' + createQueryString('tabType', v));
                }}
                classNames={tabClasses}
              >
                <TabList
                  w={350}
                  style={{ justifySelf: 'center' }}
                  defaultValue={tabTypeParam}
                >
                  <Tab value='drinkReview'>주류 리뷰</Tab>
                  <Tab value='chilling'>본격적 칠링</Tab>
                  <Tab value='community'>커뮤니티</Tab>
                </TabList>
                <Tabs.Panel value='drinkReview'>
                  <SearchDrinkReview keyword={submittedValues?.keyword ?? ''} />
                </Tabs.Panel>
                <Tabs.Panel value='chilling'>
                  <SearchChilling keyword={submittedValues?.keyword ?? ''} />
                </Tabs.Panel>
                <Tabs.Panel value='community'>
                  <SearchCommunity keyword={submittedValues?.keyword ?? ''} />
                </Tabs.Panel>
              </Tabs>
            )}
          </Flex>
        </Flex>
      </form>
    </>
  );
}
