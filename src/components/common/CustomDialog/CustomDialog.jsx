import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

function CustomDialog({ open, title, message, handleReject, handleAccept }) {
  return (
    <Dialog
      open={open}
      onClose={handleReject}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReject} color="primary" autoFocus>
          Abbrechen
        </Button>
        <Button onClick={handleAccept} color="primary">
          Weiter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
