import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import client from 'libs/apollo';
import { ExploreCard, SearchHeader } from '~/components/domains';
import { GET_ALL_RECIPES } from '~/graphql/Queries';
import { RecipeAllData } from '~/types/recipe';
import styles from '~/styles/Home.module.css';

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  client.writeQuery({
    query: GET_ALL_RECIPES,
    data: {
      recipes: data.recipes,
    },
  });

  return (
    <>
      <Head>
        <title>Recipe</title>
        <meta name='description' content='Find Recipe and measure ingredient' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SearchHeader />
      <main className={styles.main}>
        {data?.recipes.data.map((recipe) => (
          <ExploreCard
            key={recipe.id}
            id={recipe.id}
            data={recipe.attributes}
          />
        ))}
      </main>

      <footer className={styles.footer}>footer</footer>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  data: RecipeAllData;
}> = async () => {
  const { data } = await client.query<RecipeAllData>({
    query: GET_ALL_RECIPES,
  });
  return {
    props: {
      data,
    },
  };
};
