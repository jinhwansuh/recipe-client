import { HStack, Input, RadioGroup } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { RecipeInput } from '~/types/recipe';
import { recipeRadioArray } from '~/utils/recipe';
import { RECIPE_PLACEHOLDER } from '~/constants';
import UnitRadio from './UnitRadio';

interface Props {
  index: number;
  register: UseFormRegister<RecipeInput>;
}

const IngredientsInput = ({ index, register }: Props) => {
  return (
    <HStack spacing={20}>
      <Input
        placeholder={RECIPE_PLACEHOLDER.INGREDIENT_NAME}
        {...register(`ingredient.${index}.name` as const, {
          required: true,
        })}
      />
      <Input
        placeholder={RECIPE_PLACEHOLDER.INGREDIENT_WEIGH}
        {...register(`ingredient.${index}.weigh` as const, {
          required: true,
        })}
      />
      <RadioGroup defaultValue={RECIPE_PLACEHOLDER.INGREDIENT_RADIO_VALUE}>
        {recipeRadioArray.map((radio, idx) => (
          <UnitRadio
            key={idx}
            value={radio}
            index={index}
            register={register}
          />
        ))}
      </RadioGroup>
    </HStack>
  );
};

export default IngredientsInput;
