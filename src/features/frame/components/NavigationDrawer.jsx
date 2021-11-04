import React, { useEffect, useState } from 'react';
import { nanoid } from 'common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'features/user/actions';
import { reset } from 'features/mode/actions';
import { setDrawerOpen } from 'features/frame/actions';
import { deactivateArea } from 'features/deliveryAreas/areas/actions';
import routes from 'routes';

import { Divider, Drawer, List, Toolbar, useMediaQuery, Box, Button, useTheme } from '@mui/material';
import NavigationLink from './NavigationLink';
import CustomDialog from 'common/components/feedback/CustomDialog';
import { ExitToApp } from '@mui/icons-material';

function NavigationDrawer() {
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
      sx={{
        width: (theme) => (open ? theme.navigationDrawer.width : `calc(${theme.spacing(7)} + 1px)`),
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',

        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),

        [theme.breakpoints.up('sm')]: {
          width: (theme) => (!open ? `calc(${theme.spacing(9)} + 1px)` : null),
        },

        '& .MuiDrawer-paper': {
          width: (theme) => (open ? theme.navigationDrawer.width : `calc(${theme.spacing(7)} + 1px)`),
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',

          [theme.breakpoints.up('sm')]: {
            width: (theme) => (!open ? `calc(${theme.spacing(9)} + 1px)` : null),
          },
        },
      }}
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

      <Box sx={{ position: 'absolute', width: '100%', bottom: (theme) => theme.spacing(1) }}>
        <Divider />
        <Box sx={{ p: 2, pb: 0 }}>
          <Button
            sx={{
              justifyContent: 'flex-start',
              alignItems: 'center',

              maxHeight: '46px',
              minWidth: '24px',
              padding: '12px 16px 12px 14px',

              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.primary.light + '28',
              },
            }}
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
