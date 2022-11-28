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
          order
          ingredients
          uploader
          videoURL
          tag
        }
      }
    }
  }
`;

export const GET_SELECTED_RECIPE = gql`
  query getSelectedRecipe($id: ID!) {
    recipe(id: $id) {
      data {
        id
        attributes {
          title
          order
          ingredients
          uploader
          videoURL
          tag
        }
      }
    }
  }
`;

export const GET_ALL_RECIPE_ID = gql`
  query getAllRecipes {
    recipes {
      data {
        id
      }
    }
  }
`;

export const GET_SEARCH_RECIPEs = gql`
  query getSearchRecipe($searchInput: String) {
    recipes(filters: $searchInput) {
      data {
        id
        attributes {
          title
          order
          ingredients
          uploader
          videoURL
          tag
        }
      }
    }
  }
`;

export const GET_SEARCH_RECIPE = (select: string, search: string) => {
  return gql`
    query getSearchRecipe {
      recipes(filters: { ${select}: { contains: "${search}" } }) {
        data {
          id
          attributes {
            title
            order
            ingredients
            uploader
            videoURL
            tag
          }
        }
      }
    }
  `;
};
