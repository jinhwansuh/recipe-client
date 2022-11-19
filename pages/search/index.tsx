import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import _ from 'lodash';
import { GET_SEARCH_RECIPE } from '~/graphql/Queries';
import { RecipeAllData } from '~/types/recipe';

interface QueryState {
  select: string;
  search: string | undefined;
}

const SearchPage = () => {
  const router = useRouter();
  const query = router.query;
  const [queryState, setQueryState] = useState({} as QueryState);
  const [getSearchData, { loading, error, data }] = useLazyQuery<RecipeAllData>(
    GET_SEARCH_RECIPE(queryState.select, queryState.search as string),
  );

  useEffect(() => {
    if (_.isEmpty(query)) return;
    const [a, b] = Object.entries(query)[0];
    setQueryState({
      select: a,
      search: b as string | undefined,
    });
  }, [query]);

  useEffect(() => {
    if (_.isEmpty(queryState)) return;
    if (queryState.select && queryState.search) {
      getSearchData();
    }
  }, [queryState]);

  if (error) return <div>잘못된 접근입니다.</div>;
  return (
    <>
      <div>{queryState.search}의 결과값들</div>
      {loading && <div>로딩중</div>}
      {data?.recipes.data.map((recipe) => (
        <div key={recipe.id}>{recipe.attributes.title}</div>
      ))}
      {data?.recipes.data.length === 0 && <div>결과값이 없습니다.</div>}
    </>
  );
};

export default SearchPage;