import Link from 'next/link';
import { Heading, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { RecipeAttributes } from '~/types/recipe';
import { getIngredientArray, getYoutubeThumbnail } from '~/utils/convert';
import IngredientModal from '../IngredientModal';

interface Props {
  id: string;
  data: RecipeAttributes;
}

const ExploreCard = ({ id, data }: Props) => {
  const { videoURL, title, ingredients, uploader, tag } = data;
  const ingredientArray = getIngredientArray(ingredients);

  return (
    <>
      <StyledCardContainer>
        <Link href={`/detail/${id}`}>
          <StyledImageWrapper>
            <Image
              objectFit='fill'
              w={'100%'}
              // maxW={{ base: '100%', sm: '200px' }}
              src={getYoutubeThumbnail(videoURL)}
              alt='thumbnail'
            />
          </StyledImageWrapper>
        </Link>
        <StyledDetailWrapper>
          <Link href={`/detail/${id}`}>
            <Heading size={'md'} wordBreak={'keep-all'}>
              {title}
            </Heading>
          </Link>
          <div>
            <Text>{uploader}</Text>
          </div>

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

          <StyledFoodWrapper>
            <Text>요리 : {tag}</Text>
            <IngredientModal data={ingredientArray} />
          </StyledFoodWrapper>
        </StyledDetailWrapper>
      </StyledCardContainer>
    </>
  );
};

const StyledCardContainer = styled.div`
  display: flex;
  width: 700px;
  margin: 5px 0;
  box-sizing: border-box;
`;

const StyledImageWrapper = styled.div`
  width: 300px;
`;

const StyledDetailWrapper = styled.div`
  flex: 1;
  padding: 3px 5px;
`;

const StyledIngredientWrapper = styled.div`
  display: flex;
`;

const StyledIngredientDetails = styled.div`
  flex: 1;
`;

const StyledFoodWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ExploreCard;
