import React from 'react';
import { Center, ChakraProvider, Heading } from '@chakra-ui/react';
import BodyComponent from './components/BodyComponent';
import { theme } from './styles/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Center>
        <Heading size={'2xl'} color={'green.200'}>
          Tic-Tac-Toe
        </Heading>
      </Center>
      <main>
        <BodyComponent />
      </main>
    </ChakraProvider>
  );
}

export default App;
