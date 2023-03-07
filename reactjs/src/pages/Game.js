import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PlayersDetail from '../components/GameComponents/PlayersDetail';
import { BACKEND_URL, TEXT_COLOR } from '../Constants';

const Game = () => {
  const textColor = TEXT_COLOR;

  const [game, setGame] = useState();
  const location = useLocation();
  if (!game) setGame(location.state);
  let eventSource;

  useEffect(() => {
    const fetchAftEvent = async () => {
      const url = BACKEND_URL + 'games/' + game.gameId;
      console.log('Fetching');
      await fetch(url).then(async response => {
        const isJson = response.headers
          .get('content-type')
          ?.includes('application/json');
        const data = isJson && (await response.json());
        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }
        setGame(data);
      });
    };

    eventSource = new EventSource(BACKEND_URL + 'games');

    eventSource.onopen = event => console.log('connection opened');
    eventSource.onmessage = event => {
      if (game.player2) fetchAftEvent().catch(console.error);
    };
  }, []);
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
