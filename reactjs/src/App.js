import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { theme } from './styles/theme';
import Home from './pages/Home';
import Game from './pages/Game';
import Navbar from './components/Navbar';
import { WEBSOCKET_URL } from './constants';

function App() {
  return (
    <StompSessionProvider url={WEBSOCKET_URL}>
      <ChakraProvider theme={theme}>
        <Navbar />
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
