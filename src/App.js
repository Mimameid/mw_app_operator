import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Frame from './features/frame/components/Frame';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './theme/theme';

import store from './store/store';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline>
            <Frame />
          </CssBaseline>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
