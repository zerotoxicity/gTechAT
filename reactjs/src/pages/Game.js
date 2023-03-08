import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PlayersDetail from '../components/GameComponents/PlayersDetail';
import { BACKEND_URL, GET_GAME_BODY, TEXT_COLOR } from '../Constants';
import { useSubscription } from 'react-stomp-hooks';
import { checkJson } from '../helperFunctions';

const Game = () => {
  const textColor = TEXT_COLOR;

  const [game, setGame] = useState();
  const location = useLocation();
  if (!game) setGame(location.state);

  useSubscription(`/topic/lobby`, message => {
    const id = message.body.split('@')[0];
    console.log('message id', id);
    if (game && game.gameId == id) {
      const reqBody = GET_GAME_BODY;
      console.log(BACKEND_URL + 'games/' + id);
      fetch(BACKEND_URL + 'games/' + id)
        .then(async response => await response.json())
        .then(data => {
          if (!data.gameId) return;
          setGame(data);
        });
    }
  });
  if (!game) return;

  return (
    <Box m={{ base: 5, md: 10 }} pt={10}>
      <Grid>
        <GridItem mb={10}>
          <Text {...textColor} as="b" fontSize={{ base: 'md', sm: '20' }}>
            Game ID:
          </Text>
          <Text {...textColor} as="b" fontSize={{ base: 'md', sm: '30' }}>
            {' '}
            {game.gameId}
          </Text>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem>
          <PlayersDetail
            player1={game.player1}
            player2={game.player2}
            nextPlayer={game.playerTurn}
          />
        </GridItem>
        <GridItem colStart={2} colSpan={2}></GridItem>
      </Grid>
    </Box>
  );
};

export default Game;
