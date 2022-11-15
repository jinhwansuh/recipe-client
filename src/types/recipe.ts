export interface RecipeAllData {
  recipes: { data: Recipe[] };
}

export interface RecipeSelectedData {
  recipe: { data: Recipe };
}

export interface Recipe {
  id: number;
  attributes: RecipeAttributes;
}

export interface RecipeAttributes {
  title: string;
  videoURL: string;
  order: string;
  Ingredients: string;
  uploader: string;
}
