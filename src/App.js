import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Frame from './features/frame/components/Frame';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';

import store from './store/store';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline>
          <Frame />
        </CssBaseline>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
