import { gql } from '@apollo/client';

/*
 Strapi graphql을 이용하므로 
 data {
  attributes {

  }
 }
 사용해야한다.
 */

export const GET_ALL_RECIPES = gql`
  query getAllRecipes {
    recipes {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;

export const GET_SELECTED_RECIPE = gql`
  query getSelectedRecipe($id: Int!) {
    recipe(id: $id) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;