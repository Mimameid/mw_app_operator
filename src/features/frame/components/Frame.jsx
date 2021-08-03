import React from 'react';
import { nanoid } from 'common/constants';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from 'routes';

import { makeStyles } from '@material-ui/core';
import MyAppBar from 'features/frame/components/MyAppBar';
import NavigationDrawer from 'features/frame/components/NavigationDrawer';
import MySnackbar from 'features/snackbar/components/MySnackbar';
import Login from 'pages/Login';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
}));

function Frame() {
  const classes = useStyles();
  const loggedIn = useSelector(({ userState }) => userState.auth.loggedIn);

  return (
    <React.Fragment>
      <Router>
        {loggedIn ? (
          <div className={classes.container}>
            <MyAppBar />
            <NavigationDrawer />
            <Switch>
              {routes.map(({ exact, path, name, Component }) => (
                <Route key={nanoid()} exact={exact} path={path}>
                  <Component name={name} />
                </Route>
              ))}
            </Switch>
          </div>
        ) : (
          <Login />
        )}
      </Router>
      <MySnackbar />
    </React.Fragment>
  );
}

export default Frame;
