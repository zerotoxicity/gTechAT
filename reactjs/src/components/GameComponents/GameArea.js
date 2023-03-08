import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BACKEND_URL, errorAudio } from '../../constants';
import Squares from './Squares';

const GameArea = ({ game, player }) => {
  const [lock, setLock] = useState(false);
  const [curX, setCurX] = useState();
  const [curY, setCurY] = useState();
  //   const [gameBoard,setGameBoard] = useState(game.board);
  const [error, setError] = useState(false);
  const errorMessage = 'Invalid square';
  const started = game.status == 'STARTED' ? true : false;
  const playerPiece = player === game.player1 ? 'X' : 'O';
  const curTurn = game.playerTurn === player ? true : false;
  let winner;
  if (game.winner === 'D') winner = 'TIE';
  else
    winner =
      game.winner === 'X'
        ? game.player1toUpperCase()
        : game.player2.toUpperCase();
  const submitHandler = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coordX: curX,
        coordY: curY,
        playerId: player,
      }),
    };
    fetch(BACKEND_URL + 'games/' + game.gameId, requestOptions).then(e =>
      console.log(e)
    );
    setLock(false);
    setError(false);
  };

  useEffect(() => {}, [game]);

  return (
    <Box m={{ base: 5, sm: 10 }} ml={{ base: 3, sm: 10 }}>
      {game.winner !== null && (
        <Center>
          <Text
            as="b"
            fontSize={{ base: 'lg', sm: 'xl' }}
            alignSelf={'center'}
            color={'green.200'}
          >
            Winner:
          </Text>
          <Text
            as="b"
            fontSize={{ base: 'lg', sm: 'xl' }}
            alignSelf={'center'}
            color={'white'}
            ml={1}
          >
            {winner}
          </Text>
        </Center>
      )}
      <Flex direction={'column'}>
        <Grid templateRows={'(3,1fr)'} w={'fit-content'}>
          {game.board?.map((row, rIndx) => {
            return row.map((col, colIndx) => {
              return (
                <GridItem rowStart={rIndx + 1} m={5}>
                  <Squares
                    key={col}
                    started={started}
                    playerPiece={playerPiece}
                    grid={game.board}
                    setCurX={setCurX}
                    setCurY={setCurY}
                    x={rIndx}
                    y={colIndx}
                    lock={lock}
                    setLock={setLock}
                    setError={setError}
                    curTurn={curTurn}
                  />
                </GridItem>
              );
            });
          })}
        </Grid>
        {error && (
          <Text
            alignSelf={'center'}
            as="b"
            fontSize={{ base: '10', sm: 'md' }}
            color={'red'}
          >
            {errorMessage}
          </Text>
        )}
        <Button
          isDisabled={!started}
          mt={5}
          size={{ base: 'sm', md: 'lg' }}
          colorScheme={'teal'}
          onClick={() => {
            submitHandler();
          }}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default GameArea;
