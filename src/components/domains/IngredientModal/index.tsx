import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { SplitIngredient } from '~/types/recipe';
import IngredientTable from '../IngredientTable';

interface Props {
  data: SplitIngredient[];
}

const IngredientModal = ({ data }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} m={4}>
        재료 계량하기
      </Button>

      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>재료 계량</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <IngredientTable data={data} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IngredientModal;
