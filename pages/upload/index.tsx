import { useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { CREATE_RECIPE } from '../../src/graphql/Mutations';
import { RecipeAttributes } from '../../src/types/recipe';

const UploadPage = () => {
  const [input, setInput] = useState<RecipeAttributes>({
    title: '',
    videoURL: '',
    order: '',
    Ingredients: '',
    uploader: '',
  });

  const [createRecipe, { error }] = useMutation(CREATE_RECIPE);
  const handleButtonClick = () => {
    console.log(input);
    const { title, videoURL, order, Ingredients, uploader } = input;
    createRecipe({
      variables: { title, videoURL, order, Ingredients, uploader },
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div>
        <input name='title' onChange={handleInputChange}></input>
      </div>
      <div>
        <input name='videoURL' onChange={handleInputChange}></input>
      </div>
      <div>
        <input name='order' onChange={handleInputChange}></input>
      </div>
      <div>
        <input name='Ingredients' onChange={handleInputChange}></input>
      </div>
      <div>
        <input name='uploader' onChange={handleInputChange}></input>
      </div>
      <button
        onClick={() => {
          handleButtonClick();
        }}
      >
        업로드
      </button>
    </div>
  );
};

export default UploadPage;
