import { useRouter } from 'next/router';
import { useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';

const SearchHeader = () => {
  const router = useRouter();
  const [inputState, setInputState] = useState({
    select: 'tag',
    search: '',
  });

  const handleSearchClick = () => {
    router.push({
      pathname: '/search',
      query: { [inputState.select]: inputState.search },
    });
  };
  return (
    <header>
      <Flex h='90px' justifyContent={'center'} alignItems={'center'} gap={5}>
        <Flex>
          <Select
            w={20}
            defaultValue={'tag'}
            onChange={(e) =>
              setInputState((prev) => ({
                ...prev,
                ['select']: e.target.value,
              }))
            }
          >
            <option value={'title'}>제목</option>
            <option value={'tag'}>요리</option>
            <option value={'ingredients'}>재료</option>
            <option value={'uploader'}>유튜버</option>
          </Select>

          <InputGroup w={40}>
            <InputLeftElement pointerEvents='none'>
              <Search2Icon color='gray.300' />
            </InputLeftElement>
            <Input
              onChange={(e) =>
                setInputState((prev) => ({
                  ...prev,
                  ['search']: e.target.value,
                }))
              }
              type={'text'}
              placeholder='비빔국수'
              value={inputState.search}
            />
          </InputGroup>
        </Flex>
        <Button onClick={handleSearchClick}>검색</Button>
      </Flex>
    </header>
  );
};

export default SearchHeader;
