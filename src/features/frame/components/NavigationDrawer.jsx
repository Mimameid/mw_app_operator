import React, { useEffect, useState } from 'react';
import { nanoid } from 'common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'features/user/auth/authSlice';
import { resetChanged, toggleDraw } from 'features/deliveryAreas/slices/mode/actions';
import { deactivateArea } from 'features/deliveryAreas/slices/areaData/actions';
import routes from 'routes';

import { Divider, Drawer, List, Toolbar, useMediaQuery, Box, Button } from '@material-ui/core';
import NavigationLink from './NavigationLink';
import CustomDialog from 'common/components/dialogs/CustomDialog';
import { ExitToApp } from '@material-ui/icons';
import { setDrawerOpen } from '../slice';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  drawer: {
    position: 'relative',
    display: 'flex',
    flexShrink: 0,
    whiteSpace: 'nowrap',

    zIndex: 100,

    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerOpen: {
    width: 214,
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
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  logoutButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: theme.spacing(1),
  },
  logoutButton: {
    minWidth: '24px',
    maxHeight: '46px',
    padding: '12px 30px 12px 30px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.light + '28',
    },
  },
}));

function NavigationDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const match = useMediaQuery('(min-width:960px)');

  const { draw, changed, open } = useSelector((state) => ({
    draw: state.deliveryAreas.mode.draw,
    changed: state.deliveryAreas.mode.changed,
    open: state.frame.drawerOpen,
  }));

  const [transitionDialogOpen, setTransitionDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(setDrawerOpen(false));
  }, [match, dispatch]);

  const handleLogout = (event) => {
    if (changed || draw) {
      event.preventDefault();
      setTransitionDialogOpen(true);
      return;
    }
    dispatch(logout());
  };

  const handleRejectDialog = (event) => {
    setTransitionDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    if (draw) {
      dispatch(toggleDraw());
    }
    dispatch(deactivateArea());
    dispatch(resetChanged());

    setTransitionDialogOpen(false);
    dispatch(logout());
  };

  return (
    <Drawer
      className={`${classes.drawer} ${match ? (open ? classes.drawerOpen : classes.drawerClose) : null}`}
      classes={{ paper: match ? (open ? classes.drawerOpen : classes.drawerClose) : null }}
      variant={match ? 'permanent' : 'temporary'}
      anchor={'left'}
      open={open}
      onClose={() => {
        dispatch(setDrawerOpen(false));
      }}
      ModalProps={{ style: { zIndex: 1000 } }}
    >
      <Toolbar />
      <Box p={2}>
        <List>
          {routes.map((data) => (
            <NavigationLink key={nanoid()} {...data} />
          ))}
        </List>
      </Box>
      <Box className={classes.logoutButtonContainer}>
        <Divider />
        <Button
          className={classes.logoutButton}
          onClick={handleLogout}
          startIcon={<ExitToApp color={'action'} style={{ transform: 'rotate(180deg)' }} />}
          size="large"
          fullWidth
          color={'inherit'}
        >
          <Box color="text.secondary" style={{}}>
            {open ? 'Abmelden' : null}
          </Box>
        </Button>
      </Box>
      <CustomDialog
        open={transitionDialogOpen}
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        title="Bearbeitung abbrechen?"
        message="Wenn Sie die Bearbeitung abbrechen, werden alle Veränderungen
      unwiederruflich gelöscht."
      />
    </Drawer>
  );
}

export default NavigationDrawer;
