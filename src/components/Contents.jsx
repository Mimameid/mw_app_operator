import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import routes from '../routes';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationDrawer from 'features/drawer/components/NavigationDrawer';
import Login from 'pages/Login';
import MySnackbarContainer from 'features/statusCode/components/MySnackbarContainer';

function Contents() {
  const loggedIn = useSelector(({ userState }) => userState.auth.loggedIn);

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
          <Login />
        )}
      </Router>
      <MySnackbarContainer />
    </React.Fragment>
  );
}

export default Contents;
