export interface RecipeAllData {
  recipes: { data: Recipe[] };
}

export interface RecipeSelectedData {
  recipe: { data: Recipe };
}

export interface Recipe {
  id: string;
  attributes: RecipeAttributes;
}

export interface RecipeAttributes {
  title: string;
  videoURL: string;
  order: string;
  ingredients: string;
  uploader: string;
  tag: string;
  measure: JSONkeyType;
}

export type JSONkeyType = { [key: string]: string };

export type IngredientInput = {
  name: string;
  weigh: string;
  selected: string;
};

export interface RecipeInput {
  title: string;
  uploader: string;
  videoURL: string;
  order: string;
  ingredient: IngredientInput[];
  tag: string;
}

export interface RecipeAllId {
  recipes: { data: Pick<Recipe, 'id'>[] };
}
