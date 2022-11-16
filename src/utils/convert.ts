import { IngredientInput } from '~/types/recipe';

export const convertIngredientsToString = (
  ingredients: IngredientInput[],
): string => {
  return ingredients
    .reduce((acc, curr) => {
      const { name, weigh, selected } = curr;
      return `${acc},${name}:${weigh}${selected}`;
    }, '')
    .slice(1);
};
