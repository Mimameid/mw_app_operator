import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Paper } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

function DeactivatedShopNotification() {
  const shop = useSelector((state) => state.shop.shop);
  const menus = useSelector((state) => state.menus.menus.byId);
  const [open, setOpen] = useState(true);

  let hasOpeningHours = false;
  console.log(Object.values(shop.openingHours));
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

  if (!open) {
    return null;
  }

  return !hasActiveMenu || !hasOpeningHours ? (
    <Paper
      style={{ position: 'fixed', bottom: 24, right: 0, marginRight: 24, marginLeft: 24, maxWidth: 512, zIndex: 2000 }}
    >
      <Alert severity="warning" onClose={() => {}}>
        <AlertTitle>
          <Box> Ihr Shop ist inaktiv</Box>
        </AlertTitle>
        Um ihr Shop aktivieren zu können, erstellen sie {!hasActiveMenu && <strong>ein aktives Menü</strong>}
        {!hasActiveMenu && !hasOpeningHours ? ' und ' : null}
        {!hasOpeningHours && <strong>Öffnungszeiten</strong>} !
      </Alert>
    </Paper>
  ) : !shop.isActive ? (
    <Paper
      style={{ position: 'fixed', bottom: 24, right: 0, marginRight: 24, marginLeft: 24, maxWidth: 512, zIndex: 2000 }}
    >
      <Alert severity="warning" onClose={() => {}}>
        <AlertTitle>
          <Box> Ihr Shop ist inaktiv</Box>
        </AlertTitle>
        Sie können ihr Shop jederzeit im <strong>Shop Menü</strong> aktivieren.
      </Alert>
    </Paper>
  ) : null;
}

export default DeactivatedShopNotification;
