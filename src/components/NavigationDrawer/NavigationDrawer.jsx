import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Divider, Drawer, List, ListItem, ListItemIcon, IconButton, ListItemText } from '@material-ui/core';
import { DoubleArrowRounded, Map } from '@material-ui/icons';

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
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_WIDTH', payload: { width: open ? 200 : theme.spacing(7) + 1 } });
  }, [open, dispatch, theme]);

  const handleDrawerControl = () => {
    setOpen(!open);
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
        <ListItem button>
          <ListItemIcon>
            <Map />
          </ListItemIcon>
          <ListItemText primary={'Liefergebiete'} />
        </ListItem>
      </List>

      <Divider />
      <div style={{ marginTop: 'auto', textAlign: 'right', flexDirection: 'row-reverse' }}>
        <IconButton onClick={handleDrawerControl}>
          <DoubleArrowRounded style={{ transform: open ? 'rotate(-180deg)' : 'rotate(0deg)' }} />
        </IconButton>
      </div>
    </Drawer>
  );
}

export default NavigationDrawer;
