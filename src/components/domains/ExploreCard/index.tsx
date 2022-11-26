import Link from 'next/link';
import { Button, Heading, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { RecipeAttributes } from '~/types/recipe';
import { getIngredientArray, getYoutubeThumbnail } from '~/utils/convert';

interface Props {
  id: string;
  data: RecipeAttributes;
}

const ExploreCard = ({ id, data }: Props) => {
  const { videoURL, title, ingredients, tag } = data;
  const ingredientArray = getIngredientArray(ingredients);

  return (
    <Link href={`/detail/${id}`}>
      <StyledCardContainer>
        <StyledImageWrapper>
          <Image
            objectFit='fill'
            w={'100%'}
            // maxW={{ base: '100%', sm: '200px' }}
            src={getYoutubeThumbnail(videoURL)}
            alt='thumbnail'
          />
        </StyledImageWrapper>
        <StyledDetailWrapper>
          <Heading size={'md'} wordBreak={'keep-all'}>
            {title}
          </Heading>
          <StyledIngredientWrapper>
            <Text w={'40px'}>재료 :</Text>
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
            <Button variant='solid' colorScheme='blue'>
              Buy Latte
            </Button>
          </StyledFoodWrapper>
        </StyledDetailWrapper>
      </StyledCardContainer>
    </Link>
  );
};

const StyledCardContainer = styled.div`
  display: flex;
  width: 800px;
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
