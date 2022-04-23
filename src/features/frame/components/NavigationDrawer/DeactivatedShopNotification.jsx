import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDeactivatedShopNotification } from 'features/frame/actions';

import { Box, Paper, Slide } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import { selectActiveOffer } from 'features/offers/offers/slice';

function getMessage(hasActiveOffer) {
  if (hasActiveOffer) {
    return 'Sie können Ihren Shop jederzeit links im Navigationsmenü online stellen.';
  } else {
    return (
      <span>
        Um ihr Shop aktivieren zu können, erstellen sie <strong>eine aktive Speisekarte!</strong>
      </span>
    );
  }
}

function DeactivatedShopNotification() {
  const dispatch = useDispatch();
  const isShopActive = useSelector((state) => state.shop.shop.isActive);
  const deactivatedShopNotificationOpen = useSelector((state) => state.frame.deactivatedShopNotificationOpen);
  const activeOffer = useSelector(selectActiveOffer);
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

  const message = getMessage(!!activeOffer);
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
