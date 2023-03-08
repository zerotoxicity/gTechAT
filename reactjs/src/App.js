import React from 'react';
import { StompSessionProvider, useSubscription } from 'react-stomp-hooks';
import { Center, ChakraProvider, Heading } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { theme } from './styles/theme';
import Home from './pages/Home';
import Game from './pages/Game';
import { BACKEND_URL } from './constants';

function App() {
  return (
    <StompSessionProvider
      url={'ws://localhost:8080/ws'}
      debug={str => {
        console.log(str);
      }}
    >
      <ChakraProvider theme={theme}>
        <Center>
          <Heading size={'2xl'} color={'green.200'}>
            Tic-Tac-Toe
          </Heading>
        </Center>
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/game" element={<Game />} />
          </Routes>
        </main>
      </ChakraProvider>
    </StompSessionProvider>
  );
}

export default App;
