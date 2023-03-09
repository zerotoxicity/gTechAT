import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: props => ({
    body: {
      color: mode('blackAlpha.800', 'blackAlpha.800')(props),
      bg: mode('#2E2E2E', '##ebebeb')(props),
    },
  }),
};

export const theme = extendTheme({
  styles,
  fonts: {
    heading: `'Montserrat', sans-serif`,
  },
  colors: {
    primary: {
      main: '##4CE1A0',
      highContrast: '##C9FDE1',
    },
  },
  shadows: {
    outline: '0 0 0 2px #F00000',
  },
});
