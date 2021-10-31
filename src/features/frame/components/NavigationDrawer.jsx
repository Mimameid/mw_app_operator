import React, { useEffect, useState } from 'react';
import { nanoid } from 'common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'features/user/actions';
import { reset } from 'features/mode/actions';
import { setDrawerOpen } from 'features/frame/actions';
import { deactivateArea } from 'features/deliveryAreas/areas/actions';
import routes from 'routes';

import { Divider, Drawer, List, Toolbar, useMediaQuery, Box, Button, makeStyles, useTheme } from '@material-ui/core';
import NavigationLink from './NavigationLink';
import CustomDialog from 'common/components/dialogs/CustomDialog';
import { ExitToApp } from '@material-ui/icons';

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
    width: theme.navigationDrawer.width,
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
  logoutButtonInnerContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  logoutButton: {
    padding: '12px 16px 12px 14px',

    maxHeight: '46px',
    minWidth: '24px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.light + '28',
    },
  },
}));

function NavigationDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('sm'));

  const { draw, changed, open } = useSelector((state) => ({
    draw: state.mode.draw,
    changed: state.mode.changed,
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
    dispatch(deactivateArea());
    dispatch(reset());

    setTransitionDialogOpen(false);
    dispatch(logout());
  };

  return (
    <Drawer
      className={`${classes.drawer} ${match ? (open ? classes.drawerOpen : classes.drawerClose) : null}`}
      classes={{ paper: open ? classes.drawerOpen : classes.drawerClose }}
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
        <Box className={classes.logoutButtonInnerContainer}>
          <Button
            className={classes.logoutButton}
            onClick={handleLogout}
            startIcon={<ExitToApp color={'action'} style={{ transform: 'rotate(180deg)' }} />}
            size="large"
            fullWidth
          >
            <Box color="text.secondary"> {open ? 'Abmelden' : null}</Box>
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
        {/* <Divider />
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
        </Button> */}
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
