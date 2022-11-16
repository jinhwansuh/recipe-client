import { useMutation } from '@apollo/client';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useForm, useFieldArray } from 'react-hook-form';
import { IngredientsInput } from '~/components';
import { CREATE_RECIPE } from '~/graphql/Mutations';
import { RecipeAttributes, RecipeInput } from '~/types/recipe';

const UploadPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeInput>({
    defaultValues: {
      ingredient: [{ name: '', weigh: '', selected: '' }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: `ingredient`,
  });

  const [createRecipe, { error }] = useMutation(CREATE_RECIPE);
  // const handleButtonClick = () => {
  //   console.log(input);
  //   const { title, videoURL, order, ingredients, uploader, measure } = input;
  //   createRecipe({
  //     variables: { title, videoURL, order, ingredients, uploader, measure },
  //   });
  // };

  const onSubmit = (data: RecipeInput) => {
    console.log(data);
    console.log(123);
  };

  const handleAddButton = () => {
    append({ name: '', weigh: '', selected: '' });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>제목</FormLabel>
          <Input {...register('title', { required: true })} />
          <FormLabel>유튜버</FormLabel>
          <Input {...register('uploader', { required: true })} />
          <FormLabel>videoURL</FormLabel>
          <StyledInput {...register('videoURL', { required: true })} />
          <FormLabel>순서</FormLabel>
          <Textarea {...register('order', { required: true })} />
        </FormControl>
        <FormLabel>재료</FormLabel>
        {fields.map((field, index) => (
          <IngredientsInput key={field.id} index={index} register={register} />
        ))}

        <Button onClick={handleAddButton}>+</Button>
        <div>
          <Button type='submit'>Upload</Button>
        </div>
      </form>
    </>
  );
};

const StyledInput = styled(Input)`
  width: 80%;
`;

export default UploadPage;
