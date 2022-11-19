import { gql } from '@apollo/client';

export const CREATE_RECIPE = gql`
  mutation createRecipe(
    $title: String!
    $videoURL: String!
    $order: String!
    $ingredients: String!
    $uploader: String!
    $tag: String!
  ) {
    createRecipe(
      data: {
        title: $title
        videoURL: $videoURL
        order: $order
        ingredients: $ingredients
        uploader: $uploader
        tag: $tag
      }
    ) {
      data {
        id
        attributes {
          title
          videoURL
          order
          ingredients
          uploader
          tag
        }
      }
    }
  }
`;
