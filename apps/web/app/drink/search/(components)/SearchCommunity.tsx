import { Flex } from '@mantine/core';

type SearchCommunityPropsType = {
  keyword: string;
};
const SearchCommunity = ({}: SearchCommunityPropsType) => {
  //   const { t } = useTranslation();
  //   const { search, setSearch } = useSearch();
  //   const { data, loading } = useSearchCommunity(search);

  return (
    // <div>
    //   <h1>{t('searchCommunity')}</h1>
    //   <input
    //     type='text'
    //     value={search}
    //     onChange={e => setSearch(e.target.value)}
    //   />
    //   {loading ? (
    //     <p>{t('loading')}</p>
    //   ) : (
    //     <ul>
    //       {data.map(community => (
    //         <li key={community.id}>{community.name}</li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <div>
      <h1>SearchCommunity</h1>
    </div>
  );
};
export default SearchCommunity;
