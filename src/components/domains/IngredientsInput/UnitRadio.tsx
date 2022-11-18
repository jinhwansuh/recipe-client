import { Radio } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { RecipeInput } from '~/types/recipe';

interface Props {
  value: string;
  index: number;
  register: UseFormRegister<RecipeInput>;
}

const UnitRadio = ({ value, index, register }: Props) => {
  return (
    <Radio
      value={value}
      {...register(`ingredient.${index}.selected` as const, {
        required: true,
      })}
    >
      {value}
    </Radio>
  );
};

export default UnitRadio;
