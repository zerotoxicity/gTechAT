import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TEXT_COLOR } from '../../Constants';

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
    <Stack direction={'row'}>
      <Text {...textColor} as="b" fontSize={{ base: 'md', sm: '20' }}>
        {playerId} :
      </Text>
      <Box
        borderRadius="lg"
        {...boxStyle}
        minWidth={30}
        minHeight={30}
        blockSize="fit-content"
      >
        <Center>
          <Text {...textStyle} as="b" fontSize={23}>
            {piece}
          </Text>
        </Center>
      </Box>
    </Stack>
  );
};

export default Player;
