import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface Props {
  data: string[][];
}

const IngredientTable = ({ data }: Props) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>빈칸에 숫자를 입력하면 자동 계량이 됩니다.</TableCaption>
        <Thead>
          <Tr>
            <Th>Ingredient</Th>
            <Th>Base</Th>
            <Th>Measure</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default IngredientTable;
