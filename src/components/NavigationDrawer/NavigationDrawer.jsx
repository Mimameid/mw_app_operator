import React from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import useDrawerWidth from '../../hooks/useDrawerWidth';

import { Divider, Drawer, List, IconButton } from '@material-ui/core';
import { DoubleArrowRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import NavigationLinkContainer from './NavigationLink/NavigationLinkContainer';

import routes from '../../routes';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 200,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
}));

function NavigationDrawer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useDrawerWidth();

  const handleDrawerControl = () => {
    setOpen(!open);
  };

  const logout = async () => {
    const url = new URL('owners/logout', process.env.REACT_APP_API_URL);
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };

    // Default options are marked with *

    const response = await fetch(url.href, options);
    if (response.ok) {
      dispatch({ type: 'SET_LOGGEDIN', payload: false });
    }
  };

  return (
    <Drawer
      className={`${classes.drawer} ${open ? classes.drawerOpen : classes.drawerClose}`}
      classes={{ paper: open ? classes.drawerOpen : classes.drawerClose }}
      variant="permanent"
      anchor={'left'}
      open={true}
    >
      <List>
        {routes.map((data) => (
          <NavigationLinkContainer key={nanoid()} {...data} />
        ))}
      </List>

      <Divider />
      <div style={{ marginTop: 'auto', textAlign: 'right', flexDirection: 'row-reverse' }}>
        <button onClick={logout}>Logout</button>
      </div>
      <div style={{ marginTop: 'auto', textAlign: 'right', flexDirection: 'row-reverse' }}>
        <IconButton onClick={handleDrawerControl}>
          <DoubleArrowRounded style={{ transform: open ? 'rotate(-180deg)' : 'rotate(0deg)' }} />
        </IconButton>
      </div>
    </Drawer>
  );
}

export default NavigationDrawer;
