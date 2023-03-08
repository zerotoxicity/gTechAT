import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';
import { TEXT_COLOR } from '../../constants';
import Player from './Player';

const PlayersDetail = ({ player1, player2, nextPlayer, playerName }) => {
  const textColor = TEXT_COLOR;
  let count = 1;
  if (player1 && player2) count = 2;

  return (
    <Grid w={200}>
      <GridItem mb={10}>
        <Text {...textColor} as={'b'} fontSize={{ base: 'md', sm: '30' }}>
          Players:
        </Text>
        <Text color={'#ffffff'} as={'b'} fontSize={{ base: 'md', sm: '30' }}>
          {' '}
          {count}/2
        </Text>
        <Divider colorScheme={'teal'} borderWidth={'2px'} />
      </GridItem>
      <GridItem mb={{ base: 4, sm: 10 }}>
        {player1 && (
          <Player
            playerId={player1}
            nextPlayer={nextPlayer}
            piece={'X'}
            playerName={playerName}
          />
        )}
      </GridItem>

      <GridItem>
        {player2 && (
          <Player
            playerId={player2}
            nextPlayer={nextPlayer}
            piece={'O'}
            playerName={playerName}
          />
        )}
      </GridItem>
    </Grid>
  );
};

export default PlayersDetail;
