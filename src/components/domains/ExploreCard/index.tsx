import Link from 'next/link';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { RecipeAttributes } from '~/types/recipe';
import { getYoutubeThumbnail } from '~/utils/convert';

interface Props {
  id: string;
  data: RecipeAttributes;
}

const ExploreCard = ({ id, data }: Props) => {
  return (
    <Link href={`/detail/${id}`}>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        w={800}
        _hover={{
          background: 'white',
          color: 'purple',
        }}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={getYoutubeThumbnail(data.videoURL)}
          alt='thumbnail'
          _hover={{
            cursor: 'pointer',
          }}
        />

        <Stack>
          <CardBody
            _hover={{
              cursor: 'pointer',
            }}
          >
            <Heading size='md'>{data.title}</Heading>
            <HStack>
              <Text w={'90px'}>재료</Text>
              <Text py='2'>{data.ingredients}</Text>
            </HStack>
          </CardBody>

          <CardFooter>
            <Button variant='solid' colorScheme='blue'>
              Buy Latte
            </Button>
            tag: {data.tag}
          </CardFooter>
        </Stack>
      </Card>
    </Link>
  );
};

export default ExploreCard;
