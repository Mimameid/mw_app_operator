import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Contents from './components/Contents';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './theme/theme';

import store from './store/store';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline>
          <Contents />
        </CssBaseline>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
