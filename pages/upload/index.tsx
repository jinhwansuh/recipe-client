import { useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { CREATE_RECIPE } from '~/graphql/Mutations';
import { RecipeAttributes } from '~/types/recipe';

const UploadPage = () => {
  const [input, setInput] = useState<RecipeAttributes>({
    title: '',
    videoURL: '',
    order: '',
    ingredients: '',
    uploader: '',
  });

  const [createRecipe, { error }] = useMutation(CREATE_RECIPE);
  const handleButtonClick = () => {
    console.log(input);
    const { title, videoURL, order, ingredients, uploader } = input;
    createRecipe({
      variables: { title, videoURL, order, ingredients, uploader },
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div>
        <label>title</label>
        <input name='title' onChange={handleInputChange}></input>
      </div>
      <div>
        <label>videoURL</label>
        <input name='videoURL' onChange={handleInputChange}></input>
      </div>
      <div>
        <label>order</label>
        <textarea name='order' onChange={handleInputChange}></textarea>
      </div>
      <div>
        <label>ingredients</label>
        <input name='ingredients' onChange={handleInputChange}></input>
      </div>
      <div>
        <label>uploader</label>
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
