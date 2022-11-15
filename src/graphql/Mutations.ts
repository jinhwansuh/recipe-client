import { gql } from '@apollo/client';

export const CREATE_RECIPE = gql`
  mutation createRecipe(
    $title: String!
    $videoURL: String!
    $order: String!
    $Ingredients: String!
    $uploader: String!
  ) {
    createRecipe(
      data: {
        title: $title
        videoURL: $videoURL
        order: $order
        Ingredients: $Ingredients
        uploader: $uploader
      }
    ) {
      data {
        id
        attributes {
          title
          videoURL
          order
          Ingredients
          uploader
        }
      }
    }
  }
`;
