import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import CustomInput from './CustomInput';

const FormComponent = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameId, setGameId] = useState('');

  return (
    <Center>
      <Grid>
        <GridItem w={300}>
          <CustomInput
            setter={setPlayerName}
            placeholder="Player name*"
            required={true}
          />
        </GridItem>

        <Box mt={10} />

        <GridItem w={300}>
          <CustomInput setter={setGameId} placeholder="Game ID" />
        </GridItem>
      </Grid>
    </Center>
  );
};

export default FormComponent;
