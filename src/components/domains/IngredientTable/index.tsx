import { ChangeEvent, useEffect, useState } from 'react';
import {
  Flex,
  Input,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { SplitIngredient } from '~/types/recipe';

interface Props {
  data: SplitIngredient[];
}

const IngredientTable = ({ data }: Props) => {
  const [baseState, setBaseState] = useState<{
    [key: SplitIngredient[0]]: SplitIngredient[1];
  }>({});
  const [inputState, setInputState] = useState<{
    [key: SplitIngredient[0]]: SplitIngredient[1];
  }>({});

  useEffect(() => {
    data.forEach((el) => {
      setBaseState((prev) => ({
        ...prev,
        [el[0]]: el[1],
      }));
      setInputState((prev) => ({
        ...prev,
        [el[0]]: el[1],
      }));
    });
  }, [data]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const prevValue = baseState[name];
    const rate = (+value || 0) / +prevValue;
    setInputState((prev) => ({ ...prev, [name]: value }));
    data.forEach((el) =>
      setInputState((prev) => ({
        ...prev,
        [el[0]]: String(+el[1] * rate),
      })),
    );
  };

  return (
    <TableContainer>
      <Table variant='simple' size={'sm'}>
        <TableCaption>숫자를 입력하면 자동 계량이 됩니다.</TableCaption>
        <Thead>
          <Tr>
            <Th>Ingredient</Th>
            <Th>Base (Units)</Th>
            <Th>Measure</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((el, index) => (
            <Tr key={index}>
              <Td fontSize={'xl'} w={'40%'}>
                {el[0]}
              </Td>
              <Td fontSize={'xl'} w={'30%'}>
                <Flex>
                  <Text>{el[1]}</Text>
                  <Text>{el[2]}</Text>
                </Flex>
              </Td>
              <Td>
                <Input
                  name={el[0]}
                  type='number'
                  value={inputState[el[0]] || 0}
                  onChange={handleValueChange}
                  min={0}
                  w={'80%'}
                />
                <Text as={'span'} paddingLeft={'3px'}>
                  {el[2]}
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default IngredientTable;
