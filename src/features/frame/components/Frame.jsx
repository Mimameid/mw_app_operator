import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes';

import MySnackbar from 'features/snackbar/components/MySnackbar';
import ProtectedPage from 'pages/ProtectedPage';
import MyAppBar from './MyAppBar';
import NavigationDrawer from './NavigationDrawer/NavigationDrawer';
import DeactivatedShopNotification from './NavigationDrawer/DeactivatedShopNotification';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import { useAuthenticate } from 'common/hooks/useAuthenticate';
import LoadingScreen from 'pages/LoadingScreen';
import { Box } from '@mui/system';

function Frame() {
  const { loggedIn, shopRegistered, authenticating, loadingShop } = useAuthenticate();

  if (authenticating || (loggedIn && loadingShop)) {
    return <LoadingScreen />;
  }

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact={true} path="/login">
            <Login loggedIn={loggedIn} />
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
                  <Redirect from="*" to={'/'} />
                </Switch>
                <DeactivatedShopNotification />
              </Box>
            ) : (
              <>
                <Route exact={true} path="/signup">
                  <ProtectedPage loggedIn={loggedIn}>
                    <SignUp shopRegistered={shopRegistered} />
                  </ProtectedPage>
                </Route>

                <Redirect from="*" to={loggedIn ? '/signup' : '/login'} />
              </>
            )}
          </Route>
        </Switch>
      </Router>
      <MySnackbar />
    </React.Fragment>
  );
}

export default Frame;
