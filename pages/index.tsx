import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { ExploreCard, SearchHeader, ServerLoading } from '~/components/domains';
import { GET_ALL_RECIPES } from '~/graphql/Queries';
import { RecipeAllData } from '~/types/recipe';
import styles from '~/styles/Home.module.css';

export default function Home() {
  const { data, loading, error } = useQuery<RecipeAllData>(GET_ALL_RECIPES);

  return (
    <>
      <Head>
        <title>Recipe</title>
        <meta name='description' content='Find Recipe and measure ingredient' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SearchHeader />

      {loading && <ServerLoading />}
      {error && <div>서버와의 통신 에러입니다.</div>}

      <main className={styles.main}>
        {data?.recipes.data.map((recipe) => (
          <ExploreCard
            key={recipe.id}
            id={recipe.id}
            data={recipe.attributes}
          />
        ))}
      </main>
    </>
  );
}
