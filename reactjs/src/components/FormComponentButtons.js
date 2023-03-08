import { Button, Flex, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL, JOIN_GAME_BODY, NEW_GAME_BODY } from '../Constants';
import { checkJson } from '../helperFunctions';

const FormComponentButtons = ({ gameId, playerName }) => {
  const navigate = useNavigate();

  const fetchFunction = async join => {
    const reqBody = join ? JOIN_GAME_BODY : NEW_GAME_BODY;
    const id = join ? gameId + '/' : '';
    const url = BACKEND_URL;

    await fetch(url + 'games/' + id + playerName, reqBody)
      .then(async response => {
        const isJson = checkJson(response);
        const data = isJson && (await response.json());
        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }
        navigate('/game', { state: data });
      })
      .catch(error => console.error('error', error));
  };

  const onNewGameClick = async () => {
    await fetchFunction(false);
  };

  const onJoinGameClick = async gameId => {
    await fetchFunction(true);
  };

  return (
    <Flex>
      <Button
        size={{ base: 'sm', md: 'lg' }}
        colorScheme={'gray'}
        isDisabled={!(gameId && playerName)}
        onClick={async () => {
          await onJoinGameClick();
        }}
      >
        Join Game
      </Button>

      <Spacer />

      <Button
        size={{ base: 'sm', md: 'lg' }}
        colorScheme={'teal'}
        isDisabled={!playerName}
        onClick={async () => {
          await onNewGameClick();
        }}
      >
        New Game
      </Button>
    </Flex>
  );
};

export default FormComponentButtons;
