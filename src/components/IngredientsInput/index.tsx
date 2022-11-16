import { HStack, Input, RadioGroup } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { RecipeInput } from '~/types/recipe';
import { recipeRadioArray } from '~/utils/recipe';
import UnitRadio from './UnitRadio';

interface Props {
  index: number;
  register: UseFormRegister<RecipeInput>;
}

const IngredientsInput = ({ index, register }: Props) => {
  return (
    <HStack spacing={20}>
      <Input
        placeholder='간장'
        {...register(`ingredient.${index}.name` as const, {
          required: true,
        })}
      />
      <Input
        placeholder='1'
        {...register(`ingredient.${index}.weigh` as const, {
          required: true,
        })}
      />
      <RadioGroup defaultValue={'Tb'}>
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
