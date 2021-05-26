import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationDrawer from './NavigationDrawer/NavigationDrawer';
import LoginContainer from './Login/LoginContainer';
import MySnackbarContainer from './SnackBar/MySnackbarContainer';

import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import routes from '../routes';

function Contents() {
  const loggedIn = useSelector((state) => state.userState.auth.loggedIn);

  return (
    <React.Fragment>
      <Router>
        {loggedIn ? (
          <React.Fragment>
            <NavigationDrawer />
            <Switch>
              {routes.map(({ exact, path, Component }) => (
                <Route key={nanoid()} exact={exact} path={path} component={Component}></Route>
              ))}
            </Switch>
          </React.Fragment>
        ) : (
          <LoginContainer />
        )}
      </Router>
      <MySnackbarContainer />
    </React.Fragment>
  );
}

export default Contents;
