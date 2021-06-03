import React from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import useDrawerWidth from '../../hooks/useDrawerWidth';

import { ListItem, ListItemIcon, ListItemText, Divider, Drawer, List, IconButton } from '@material-ui/core';
import { DoubleArrowRounded, ExitToApp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import NavigationLinkContainer from './NavigationLink/NavigationLinkContainer';

import routes from '../../routes';

const useStyles = makeStyles((theme) => ({
  drawer: {
    position: 'relative',
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
    overflowX: 'hidden',
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
  logoutButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: '50px',
  },
  logoutButton: {
    // padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,

    color: theme.palette.text.secondary,

    fontSize: theme.typography.htmlFontSize,
    fontFamily: theme.typography.fontFamily,
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
      <div className={classes.logoutButtonContainer}>
        <Divider />
        <ListItem className={classes.logoutButton} button onClick={logout}>
          <ListItemIcon>
            <ExitToApp style={{ transform: 'rotate(-180deg)' }} />
          </ListItemIcon>
          <ListItemText primary={'Abmelden'} />
        </ListItem>
        <Divider />
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
