import { Center, Grid, GridItem, Text } from '@chakra-ui/react';
import { useState } from 'react';
import CustomInput from './CustomInput';
import FormComponentButtons from './FormComponentButtons';

const FormComponent = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameId, setGameId] = useState('');
  const [error, setError] = useState(false);
  const margTop = 10;

  return (
    <Center>
      <Grid w={{ base: 200, sm: 500 }}>
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
        {error && (
          <Text
            as="b"
            fontSize={{ base: '10', sm: 'md' }}
            color={'red'}
            justifySelf={'center'}
            mt={5}
            aria-type
          >
            Invalid name/game!
          </Text>
        )}
        <GridItem mt={margTop}>
          <FormComponentButtons
            gameId={gameId}
            playerName={playerName}
            setError={setError}
          />
        </GridItem>
      </Grid>
    </Center>
  );
};

export default FormComponent;
