import { Center, Divider, Flex, Heading, IconButton } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/');
  };
  return (
    <>
      <Flex>
        <IconButton
          aria-label="Back button"
          icon={<AiOutlineHome />}
          m={10}
          fontSize={'30px'}
          colorScheme={'#303030'}
          onClick={() => {
            clickHandler();
          }}
        />
        <Center>
          <Heading size={{ base: 'md', sm: '2xl' }} color={'green.200'}>
            Tic-Tac-Toe
          </Heading>
        </Center>
      </Flex>
      <Divider />
    </>
  );
};

export default Navbar;
