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

const IngredientModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} m={4}>
        재료 계량하기
      </Button>

      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, animi
            id aliquam mollitia error, rerum voluptatum corrupti consequuntur
            dolorum vel nam ad culpa, beatae fuga! Quisquam corporis est
            molestias doloremque.Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Est, animi id aliquam mollitia error, rerum
            voluptatum corrupti consequuntur dolorum vel nam ad culpa, beatae
            fuga! Quisquam corporis est molestias doloremque.Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Est, animi id aliquam
            mollitia error, rerum voluptatum corrupti consequuntur dolorum vel
            nam ad culpa, beatae fuga! Quisquam corporis est molestias
            doloremque.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Est, animi id aliquam mollitia error, rerum voluptatum corrupti
            consequuntur dolorum vel nam ad culpa, beatae fuga! Quisquam
            corporis est molestias doloremque.Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Est, animi id aliquam mollitia error,
            rerum voluptatum corrupti consequuntur dolorum vel nam ad culpa,
            beatae fuga! Quisquam corporis est molestias doloremque.
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
