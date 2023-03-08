import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { TEXT_COLOR } from '../../Constants';
import Player from './Player';

const PlayersDetail = ({ player1, player2, nextPlayer }) => {
  const textColor = TEXT_COLOR;

  return (
    <Grid w={200}>
      <GridItem mb={5}>
        <Text {...textColor} as={'b'} fontSize={{ base: 'md', sm: '30' }}>
          Players:
        </Text>
      </GridItem>

      <GridItem>
        {player1 && (
          <Player playerId={player1} nextPlayer={nextPlayer} piece={'X'} />
        )}
      </GridItem>

      <GridItem mt={10}>
        {player2 && (
          <Player playerId={player2} nextPlayer={nextPlayer} piece={'O'} />
        )}
      </GridItem>
    </Grid>
  );
};

export default PlayersDetail;
