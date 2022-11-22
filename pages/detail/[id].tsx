import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Center, Flex, Heading, Spacer } from '@chakra-ui/react';
import client from 'libs/apollo';
import { ParsedUrlQuery } from 'querystring';
import { IngredientModal } from '~/components/domains';
import { GET_ALL_RECIPE_ID, GET_SELECTED_RECIPE } from '~/graphql/Queries';
import { RecipeAllId, RecipeSelectedData } from '~/types/recipe';
import { getIngredientArray, getYoutubeEmbedURL } from '~/utils/convert';

const DetailPage = ({
  details,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const handleTagClick = () => {
    router.push({
      pathname: '/search',
      query: { tag: details.recipe.data.attributes.tag },
    });
  };

  const { title, videoURL, tag, uploader, order, ingredients } =
    details.recipe.data.attributes;

  const ingredientArray = getIngredientArray(ingredients);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={title} />
      </Head>
      <Flex as={'main'} direction='column' alignItems={'center'} minH={'100vh'}>
        <Flex direction='column' w={600}>
          <Center>
            <iframe
              src={getYoutubeEmbedURL(videoURL)}
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              width={500}
              height={300}
            />
          </Center>

          <Heading size={'xl'}>{title}</Heading>
          <Flex>
            <Box onClick={handleTagClick}>{tag}</Box>
            <Spacer />
            <Box>{uploader}</Box>
          </Flex>
          <Box>
            {order.split('\n').map((line, index) => (
              <Box key={index}>{line}</Box>
            ))}
          </Box>
          <Flex>
            <Box w={'70px'}>재료 : </Box>
            <Box>{ingredients}</Box>
            <Box>
              <IngredientModal data={ingredientArray} />
            </Box>
          </Flex>
        </Flex>
      </Flex>
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
