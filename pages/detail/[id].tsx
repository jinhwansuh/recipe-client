import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import client from 'libs/apollo';
import { ParsedUrlQuery } from 'querystring';
import { GET_ALL_RECIPE_ID, GET_SELECTED_RECIPE } from '~/graphql/Queries';
import { RecipeAllId, RecipeSelectedData } from '~/types/recipe';

const DetailPage = ({
  details,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { id } = router.query;

  console.log(details);

  return (
    <>
      <Head>
        <title>{details.recipe.data.attributes.title}</title>
        <meta
          name='description'
          content={details.recipe.data.attributes.title}
        />
      </Head>
      <p>id: {id}</p>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<RecipeAllId>({
    query: GET_ALL_RECIPE_ID,
  });
  const paths = data.recipes.data.map((recipe) => ({
    params: { id: recipe.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  details: RecipeSelectedData;
}> = async ({ params }) => {
  const id = (params as ParsedUrlQuery).id;
  const { data } = await client.query<RecipeSelectedData>({
    query: GET_SELECTED_RECIPE,
    variables: { id },
  });
  return {
    props: {
      details: data,
    },
  };
};

export default DetailPage;
