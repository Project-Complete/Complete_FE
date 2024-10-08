'use client';
import {
  AutocompleteProps,
  Button,
  CloseButton,
  Divider,
  Flex,
  Group,
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
  const tabTypeParam = (searchParams?.get('tabType') || 'drinkReview') as SearchTabType;
  const drinkTypeParam = (searchParams?.get('drinkType') || 'all') as DrinkType;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const form = useForm<{
    keyword: string;
    tabType: SearchTabType;
    drinkType: DrinkType;
  }>({
    mode: 'uncontrolled',
    initialValues: { keyword: keywordParam, tabType: tabTypeParam, drinkType: drinkTypeParam },
    enhanceGetInputProps: payload => {
      if (payload.options.fieldType === 'searchAutocomplete') {
        return {
          placeholder: '찾는 주류가 있으신가요?',
          onSubmitOption: (value: string) => {
            router.push(pathname + '?' + createQueryString('keyword', value));
            form.setFieldValue('keyword', value);
            setSubmittedValues(
              produce(prev => {
                prev.keyword = value;
              }),
            );
          },
          onChange: (keyword: string) => {
            form.setValues({ keyword });
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              const keyword = e.currentTarget.value;
              handleOnclickSearch(keyword);
              setSubmittedValues(
                produce(prev => {
                  prev.keyword = keyword;
                }),
              );
            }
          },
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

  const {
    recentSearches,
    deleteRecentSearch,
    addRecentSearch,
    setRecentSearches,
  } = useRecentSearches();

  const handleOnclickSearch = (keyword: string) => {
    router.push(pathname + '?' + createQueryString('keyword', keyword));
  };

  const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({
    option,
  }) => {
    return (
      <Flex justify={'space-between'} w={'100%'}>
        <Flex>{option.value}</Flex>
        <CloseButton
          onClick={e => {
            e.stopPropagation();
            deleteRecentSearch(recentSearches.indexOf(option.value));
          }}
        />
      </Flex>
    );
  };

  const handleOnClickKeyword = (keyword: string) => {
    router.push(pathname + '?' + createQueryString('keyword', keyword));
    form.setFieldValue('keyword', keyword);
    setSubmittedValues(
      produce(prev => {
        prev.keyword = keyword;
      }),
    );
  }

  const handleOnClickDrinkType = (drinkType: DrinkType) => {
    if (drinkType === form.getValues().drinkType) {
      router.push(pathname + '?' + createQueryString('drinkType', 'all'));
      form.setFieldValue('drinkType', 'all');
      setSubmittedValues(
        produce(prev => {
          prev.drinkType = 'all';
        }),
      );
    }
    else {
      router.push(pathname + '?' + createQueryString('drinkType', drinkType));
      form.setFieldValue('drinkType', drinkType);
      setSubmittedValues(
        produce(prev => {
          prev.drinkType = drinkType;
        }),
      );
    }
  }

  return (
    <>
      <form
        onSubmit={form.onSubmit((data, event) => {
          setSubmittedValues(data);
          addRecentSearch(data.keyword);
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
              renderOption={renderAutocompleteOption}
              data={recentSearches}
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
                />
              }
            />
            <Flex h={48} justify={'center'} align={'center'}>
              <Button
                bg={'none'}
                c={'gray'}
                onClick={() => handleOnclickSearch(form.getValues().keyword)}
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
                  currentDrinkType={form.getValues().drinkType}
                  recentSearches={recentSearches}
                  deleteRecentSearch={deleteRecentSearch}
                  handleOnClickKeyword={handleOnClickKeyword}
                  handleOnClickDrinkType={handleOnClickDrinkType}
                />
                <MainDrinkContent drinkType={form.getValues().drinkType} />
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
                  <Tab value='drinkReview'>주류</Tab>
                  <Tab value='chilling'>본격적 칠링</Tab>
                  {/*<Tab value='community'>커뮤니티</Tab> */}
                </TabList>
                <Tabs.Panel value='drinkReview'>
                  <SearchDrinkReview keyword={submittedValues?.keyword ?? ''} />
                </Tabs.Panel>
                <Tabs.Panel value='chilling'>
                  <SearchChilling keyword={submittedValues?.keyword ?? ''} />
                </Tabs.Panel>
                {/* <Tabs.Panel value='community'>
                  <SearchCommunity keyword={submittedValues?.keyword ?? ''} />
                </Tabs.Panel> */}
              </Tabs>
            )}
          </Flex>
        </Flex>
      </form>
    </>
  );
}
