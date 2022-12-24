import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Center, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
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

  if (router.isFallback) {
    return (
      <div>
        <div>정적페이지가 없는 새로운 데이터를 불러오는 중입니다.</div>
        <div>데이터가 없다면 404페이지가 보여지게 됩니다.</div>
      </div>
    );
  }

  const handleTagClick = () => {
    router.push({
      pathname: '/search',
      query: { tag: details.recipe.data.attributes.tag },
    });
  };

  const handleUploaderClick = () => {
    router.push({
      pathname: '/search',
      query: { uploader: details.recipe.data.attributes.uploader },
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
          <StyledSubWrapper>
            <StyledTag onClick={handleTagClick}>{tag}</StyledTag>
            <StyledTag onClick={handleUploaderClick}>{uploader}</StyledTag>
          </StyledSubWrapper>
          <StyledOrderWrapper>
            {order.split('\n').map((line, index) => (
              <Box key={index}>{line}</Box>
            ))}
          </StyledOrderWrapper>
          <Flex>
            <StyledIngredientWrapper>
              <Text w={'40px'}>재료 : </Text>
              <StyledIngredientDetails>
                {ingredientArray.map((ingredient, index) => (
                  <Text as={'span'} key={index} px='1'>
                    {ingredient[0]}
                  </Text>
                ))}
              </StyledIngredientDetails>
            </StyledIngredientWrapper>
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

  // true, false, 'blocking'
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{
  details: RecipeSelectedData;
}> = async ({ params }) => {
  const id = (params as ParsedUrlQuery).id;
  const { data: details } = await client.query<RecipeSelectedData>({
    query: GET_SELECTED_RECIPE,
    variables: { id },
  });

  if (!details.recipe.data) return { notFound: true };

  return {
    props: {
      details,
    },
  };
};
const StyledSubWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const StyledTag = styled.div`
  border: 0.5px solid #eee;
  border-radius: 10%;

  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const StyledOrderWrapper = styled.div`
  margin: 23px 0;
`;

const StyledIngredientWrapper = styled.div`
  display: flex;
`;

const StyledIngredientDetails = styled.div`
  flex: 1;
`;

export default DetailPage;
