import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TEXT_COLOR } from '../../constants';

const Player = ({ playerId, nextPlayer, piece }) => {
  const [boxStyle, setBoxStyle] = useState();
  const [textStyle, setTextStyle] = useState();
  const textColor = TEXT_COLOR;
  useEffect(() => {
    isTurn(playerId, nextPlayer);
  }, [nextPlayer, playerId]);

  const isTurn = (playerId, nextPlayer) => {
    if (nextPlayer === playerId) {
      setBoxStyle({ bg: '#3C8FFB' });
      setTextStyle({ color: '#ffffff' });
    } else {
      setBoxStyle({});
      setTextStyle({ color: '#ffffff' });
    }
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" w={'fit-content'}>
      <GridItem colStart={1} colSpan={2}>
        <Text {...textColor} as="b" fontSize={{ base: 'md', sm: '25' }}>
          {playerId} :
        </Text>
      </GridItem>
      <GridItem colStart={3} colSpan={1} pl={1}>
        <Box
          borderRadius="lg"
          {...boxStyle}
          minWidth={30}
          minHeight={30}
          blockSize="fit-content"
        >
          <Center>
            <Text {...textStyle} as="b" fontSize={25}>
              {piece}
            </Text>
          </Center>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Player;
