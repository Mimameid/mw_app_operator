import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Collapse, Paper } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';

function DeactivatedShopNotification() {
  const shop = useSelector((state) => state.shop.shop);
  const menus = useSelector((state) => state.menus.menus.byId);
  const [open, setOpen] = useState(true);

  let hasOpeningHours = false;

  for (const day of Object.values(shop.openingHours)) {
    if (day.length) {
      hasOpeningHours = true;
      break;
    }
  }

  let hasActiveMenu = false;
  for (const menu of Object.values(menus)) {
    if (menu.isActive) {
      hasActiveMenu = true;
      break;
    }
  }

  return (
    <Collapse in={false}>
      <Paper
        style={{
          position: 'fixed',
          bottom: 24,
          right: 0,
          marginRight: 24,
          marginLeft: 24,
          maxWidth: 512,
          zIndex: 2000,
        }}
      >
        <Alert
          severity="warning"
          onClose={() => {
            setOpen(!open);
          }}
        >
          <AlertTitle>
            <Box> Ihr Shop ist inaktiv</Box>
          </AlertTitle>
          Um ihr Shop aktivieren zu können, erstellen sie {!hasActiveMenu && <strong>ein aktives Menü</strong>}
          {!hasActiveMenu && !hasOpeningHours ? ' und ' : null}
          {!hasOpeningHours && <strong>Öffnungszeiten</strong>} !
        </Alert>
      </Paper>
    </Collapse>
  );
}

export default DeactivatedShopNotification;
