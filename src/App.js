import React from 'react';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';
import NavigationDrawer from './components/NavigationDrawer/NavigationDrawer';
import UpdateDeliveryZone from './components/UpdateDeliveryZones/UpdateDeliveryZone';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './theme/theme';

import store from './store/store';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline>
          <NavigationDrawer />
          <Grid container direction="column">
            <UpdateDeliveryZone />
          </Grid>
        </CssBaseline>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
