import { IngredientInput } from '~/types/recipe';

const DEFAULT_IMAGE_URL =
  'https://cdn.pixabay.com/photo/2022/10/24/18/10/street-7544046_960_720.jpg';

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

export const getYoutubeThumbnail = (videoURL: string): string => {
  const [_, id] = videoURL.split('?v=');
  if (id) return `https://img.youtube.com/vi/${id}/0.jpg`;
  return DEFAULT_IMAGE_URL;
};
