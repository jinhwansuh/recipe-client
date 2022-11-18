import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import client from 'libs/apollo';
import { ParsedUrlQuery } from 'querystring';
import { GET_ALL_RECIPE_ID, GET_SELECTED_RECIPE } from '~/graphql/Queries';
import { Recipe, RecipeAllId } from '~/types/recipe';

const TitlePage = ({
  details,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { id } = router.query;

  console.log(details);

  return <p>id: {id}</p>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<RecipeAllId>({
    query: GET_ALL_RECIPE_ID,
  });
  const paths = data.recipes.data.map((recipe) => ({
    params: { id: String(recipe.id) },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = (params as ParsedUrlQuery).id;
  const { data } = await client.query<Recipe>({
    query: GET_SELECTED_RECIPE,
    variables: { id },
  });
  return {
    props: {
      details: data,
    },
  };
};

export default TitlePage;
