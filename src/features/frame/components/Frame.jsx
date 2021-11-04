import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes';

import MySnackbar from 'features/snackbar/components/MySnackbar';
import ProtectedPage from 'pages/ProtectedPage';
import MyAppBar from './MyAppBar';
import NavigationDrawer from './NavigationDrawer';
import DeactivatedShopNotification from './DeactivatedShopNotification';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import { useAuthenticate } from 'common/hooks/useAuthenticate';
import LoadingScreen from 'pages/LoadingScreen';
import { Box } from '@mui/system';

function Frame() {
  const { loggedIn, shopRegistered, loading } = useAuthenticate();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact={true} path="/login">
            <Login loggedIn={loggedIn} />
          </Route>
          <Route exact={true} path="/signup">
            <ProtectedPage loggedIn={loggedIn}>
              <SignUp shopRegistered={shopRegistered} />
            </ProtectedPage>
          </Route>

          <Route>
            {shopRegistered ? (
              <Box sx={{ display: 'flex' }}>
                <MyAppBar />
                <NavigationDrawer />
                <Switch>
                  {routes.map(({ exact, path, name, Component }) => (
                    <Route key={name} exact={exact} path={path}>
                      <ProtectedPage loggedIn={loggedIn}>
                        <Component name={name} />
                      </ProtectedPage>
                    </Route>
                  ))}
                </Switch>
                <DeactivatedShopNotification />
              </Box>
            ) : (
              <Redirect from="*" to="/signup" />
            )}
          </Route>
        </Switch>
      </Router>
      <MySnackbar />
    </React.Fragment>
  );
}

export default Frame;
