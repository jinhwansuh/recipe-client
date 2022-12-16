import { useRouter } from 'next/router';
import { Search2Icon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { SearchInput } from '~/types/recipe';

const SearchHeader = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SearchInput>({
    defaultValues: {
      select: 'tag',
      search: '',
    },
  });

  const handleSearchSubmit = (data: SearchInput) => {
    router.push({
      pathname: '/search',
      query: { [data.select]: data.search },
    });
  };

  return (
    <header>
      <div>
        <form onSubmit={handleSubmit(handleSearchSubmit)}>
          <Flex
            h='90px'
            justifyContent={'center'}
            alignItems={'center'}
            gap={4}
          >
            <Flex>
              <Select w={'100px'} defaultValue={'tag'} {...register('select')}>
                <option value={'title'}>제목</option>
                <option value={'tag'}>요리</option>
                <option value={'ingredients'}>재료</option>
                <option value={'uploader'}>유튜버</option>
              </Select>

              <InputGroup w={'80%'}>
                <InputLeftElement pointerEvents='none'>
                  <Search2Icon color='gray.300' />
                </InputLeftElement>
                <Input
                  {...register('search', { required: true })}
                  type={'text'}
                  placeholder='비빔국수'
                />
              </InputGroup>
            </Flex>
            <Button type='submit'>검색</Button>
          </Flex>
        </form>
      </div>
    </header>
  );
};

export default SearchHeader;
