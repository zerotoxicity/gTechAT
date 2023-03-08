import { Box, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { errorAudio, TEXT_COLOR } from '../../constants';

const Squares = ({
  started,
  playerPiece,
  x,
  y,
  grid,
  setCurX,
  setCurY,
  lock,
  setLock,
  setError,
  curTurn,
}) => {
  const [textColor, setTextColor] = useState(TEXT_COLOR);
  const [changed, setChanged] = useState(false);
  let piece;
  if (grid[x][y] == -1) piece = '';
  else piece = grid[x][y] == 0 ? 'X' : 'O';
  const [curPiece, setCurPiece] = useState(piece);

  const clickHandler = () => {
    if (lock && changed && curPiece == playerPiece) {
      setCurPiece('');
      setLock(false);
      setChanged(false);
      setCurX();
      setCurY();
    } else {
      setCurPiece(playerPiece);
      setTextColor({ color: '#3C8FFB' });
      setLock(true);
      setChanged(true);
      setCurX(x);
      setCurY(y);
    }
    setError(false);
  };

  return (
    <Button
      borderColor={'white'}
      border="1px"
      colorScheme={'#303030'}
      onClick={() => {
        if (
          (lock && !changed) ||
          !(curPiece == '' || curPiece == playerPiece)
        ) {
          setError(true);
          errorAudio.play();
        } else clickHandler();
      }}
      h={{ base: 10, md: 120 }}
      w={{ base: 10, md: 120 }}
      isDisabled={!started || !curTurn}
    >
      <Text {...textColor} as="b" fontSize={{ base: 30, md: 70 }}>
        {curPiece}
      </Text>
    </Button>
  );
};

export default Squares;
