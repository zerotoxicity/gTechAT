import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
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
  };

  useEffect(() => {}, [game]);

  return (
    <Flex direction={'column'}>
      <Grid templateRows={'(3,1fr)'} w={'30%'}>
        {game.board?.map((row, rIndx) => {
          return row.map((col, colIndx) => {
            return (
              <GridItem rowStart={rIndx + 1}>
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
          if (error) errorAudio.play();
          else submitHandler();
        }}
      >
        Submit
      </Button>
    </Flex>
  );
};

export default GameArea;
