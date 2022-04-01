import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'features/user/actions';
import { reset } from 'features/mode/actions';
import { setDrawerOpen } from 'features/frame/actions';
import { deactivateArea } from 'features/deliveryAreas/areas/actions';
import { selectUiMode } from '../..';
import routes from 'routes';

import { Divider, Drawer, List, Toolbar, useMediaQuery, Box, Button, useTheme, Fade } from '@mui/material';
import NavigationLink from './NavigationLink';
import ShopStatus from './ShopStatus/ShopStatus';
import ActivateShopSwitch from './ActivateShopSwitch';
import AlertDialog from 'common/components/feedback/AlertDialog';
import { ExitToApp } from '@mui/icons-material';

function NavigationDrawer() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('sm'));
  const { draw, changed, open } = useSelector(selectUiMode);

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
            width: (theme) => (!open ? `calc(${theme.spacing(8)} + 1px)` : null),
          },
        },
      }}
      variant={match ? 'permanent' : 'temporary'}
      anchor={'left'}
      open={open}
      onClose={() => {
        dispatch(setDrawerOpen(false));
      }}
      PaperProps={{
        elevation: 1,
      }}
      ModalProps={{ style: { zIndex: 1000 } }}
    >
      <Toolbar />
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            flex: 1,
            py: 2,
            px: 1,
          }}
        >
          <List>
            {routes.map((data) => (
              <NavigationLink key={data.name} {...data} />
            ))}
          </List>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
          <Box sx={{ p: 1 }}>
            <ShopStatus />
          </Box>
          <Divider sx={{ borderColor: !open ? 'common.white' : null }} />

          <Box sx={{ p: 1 }}>
            <ActivateShopSwitch />
          </Box>
          <Divider />
          <Box sx={{ p: 1 }}>
            <Button
              sx={{
                minWidth: '24px',
                height: '42px',

                justifyContent: 'flex-start',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: theme.palette.primary.light + '28',
                },
              }}
              onClick={handleLogout}
              startIcon={
                <ExitToApp
                  sx={{
                    ml: 0.8,
                  }}
                  color={'action'}
                  style={{ transform: 'rotate(180deg)' }}
                />
              }
              size="large"
              fullWidth
            >
              <Fade in={open}>
                <Box color="text.secondary"> Abmelden</Box>
              </Fade>
            </Button>
          </Box>
        </Box>
      </Box>

      <AlertDialog
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
