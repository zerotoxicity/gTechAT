import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BACKEND_URL, TEXT_COLOR } from '../constants';
import { useSubscription } from 'react-stomp-hooks';
import GameDetails from '../components/GameComponents/GameDetails';
import GameArea from '../components/GameComponents/GameArea';

const Game = () => {
  const [game, setGame] = useState();
  const [player, setPlayer] = useState();
  const location = useLocation().state;

  if (location && !game) {
    setGame(location.data);
    setPlayer(location.player);
  }

  useSubscription(`/topic/lobby`, message => {
    const id = message.body.split('@')[0];
    if (game && game.gameId == id) {
      console.log(message.body);
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
    <Grid templateColumns="repeat(3,1fr)" m={{ base: 5, md: 10 }} pt={10}>
      <GridItem colSpan={1}>
        <GameDetails game={game} />
      </GridItem>
      <GridItem colSpan={1}>
        <GameArea game={game} player={player} />
      </GridItem>
    </Grid>
  );
};

export default Game;
