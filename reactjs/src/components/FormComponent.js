import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Grid,
  GridItem,
  Spacer,
} from '@chakra-ui/react';
import { useState } from 'react';
import CustomInput from './CustomInput';
import FormComponentButtons from './FormComponentButtons';

const FormComponent = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameId, setGameId] = useState('');
  const margTop = 10;

  return (
    <Center>
      <Grid w={500}>
        <GridItem>
          <CustomInput
            setter={setPlayerName}
            placeholder="Player name*"
            required={true}
          />
        </GridItem>

        <GridItem mt={margTop}>
          <CustomInput setter={setGameId} placeholder="Game ID" />
        </GridItem>

        <GridItem mt={margTop}>
          <FormComponentButtons gameId={gameId} playerName={playerName} />
        </GridItem>
      </Grid>
    </Center>
  );
};

export default FormComponent;
