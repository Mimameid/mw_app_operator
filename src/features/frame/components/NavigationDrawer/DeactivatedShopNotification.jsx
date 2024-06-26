import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDeactivatedShopNotification } from 'features/frame/actions';

import { Box, Paper, Slide } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import { selectActiveMenu } from 'features/products/menus/slice';

function getMessage(hasActiveMenu) {
  if (hasActiveMenu) {
    return 'Sie können Ihren Shop jederzeit links im Navigationsmenü online stellen.';
  } else {
    return (
      <span>
        Um ihr Shop aktivieren zu können, erstellen sie <strong>eine aktives Menü!</strong>
      </span>
    );
  }
}

function DeactivatedShopNotification() {
  const dispatch = useDispatch();
  const isShopActive = useSelector((state) => state.shop.shop.isActive);
  const deactivatedShopNotificationOpen = useSelector((state) => state.frame.deactivatedShopNotificationOpen);
  const activeMenu = useSelector(selectActiveMenu);
  const [open, setOpen] = useState(!isShopActive);

  useEffect(() => {
    if (!isShopActive) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [dispatch, isShopActive]);

  useEffect(() => {
    if (deactivatedShopNotificationOpen) {
      setOpen(true);
      dispatch(setDeactivatedShopNotification(false));
    }
  }, [dispatch, deactivatedShopNotificationOpen]);

  const message = getMessage(!!activeMenu);
  return open ? (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 0,
        mx: 3,

        maxWidth: 512,
        zIndex: (theme) => theme.zIndex.drawer,
      }}
    >
      <Slide direction="left" in={open}>
        <Paper elevation={4}>
          <Alert
            severity={'warning'}
            onClose={() => {
              setOpen(!open);
            }}
          >
            <AlertTitle>
              <Box> Ihr Shop ist offline</Box>
            </AlertTitle>
            {message}
          </Alert>
        </Paper>
      </Slide>
    </Box>
  ) : null;
}

export default DeactivatedShopNotification;
