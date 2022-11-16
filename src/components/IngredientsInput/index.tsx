import { HStack, Input, Select } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { RecipeInput } from '~/types/recipe';

interface Props {
  index: number;
  register: UseFormRegister<RecipeInput>;
}

const IngredientsInput = ({ index, register }: Props) => {
  return (
    <HStack>
      <Input
        placeholder='재료이름'
        {...register(`ingredient.${index}.name` as const, {
          required: true,
        })}
      />
      <Input
        placeholder='양(숫자)'
        {...register(`ingredient.${index}.weigh` as const, {
          required: true,
        })}
      />
      <Select
        placeholder='계량도구'
        {...register(`ingredient.${index}.selected` as const, {
          required: true,
        })}
      >
        <option value='Tb'>Tb</option>
        <option value='인분'>인분</option>
        <option value='kg'>kg</option>
        <option value='g'>g</option>
        <option value='ml'>l</option>
      </Select>
    </HStack>
  );
};

export default IngredientsInput;
