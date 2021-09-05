import React from 'react';

import { BrowserRouter as Switch, Route } from 'react-router-dom';
import routes from 'routes';

import { makeStyles } from '@material-ui/core';
import MyAppBar from 'features/frame/components/MyAppBar';
import NavigationDrawer from 'features/frame/components/NavigationDrawer';
import ProtectedPage from 'pages/ProtectedPage';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
}));

function Contents() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <MyAppBar />
      <NavigationDrawer />
      <Switch>
        {routes.map(({ exact, path, name, Component }) => (
          <Route key={name} exact={exact} path={path}>
            <ProtectedPage>
              <Component name={name} />
            </ProtectedPage>
          </Route>
        ))}
      </Switch>
    </div>
  );
}

export default Contents;
