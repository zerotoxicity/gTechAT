import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { TEXT_COLOR } from '../../constants';
import PlayersDetail from './PlayersDetail';

const GameDetails = ({ game, playerName }) => {
  const textColor = TEXT_COLOR;

  return (
    <Box>
      <Grid>
        <GridItem mb={10}>
          <Text {...textColor} as="b" fontSize={{ base: 'md', sm: '30' }}>
            Game ID:
          </Text>
          <Text
            {...textColor}
            as="b"
            fontSize={{ base: 'md', sm: '30' }}
            color={'#ffffff'}
          >
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
            playerName={playerName}
          />
        </GridItem>
        <GridItem colStart={2} colSpan={2}></GridItem>
      </Grid>
    </Box>
  );
};

export default GameDetails;
