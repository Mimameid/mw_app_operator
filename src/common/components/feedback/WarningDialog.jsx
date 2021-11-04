import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

function WarningDialog({ open, title, message, handleReject, handleAccept, disabled }) {
  return (
    <Dialog
      PaperProps={{
        style: { padding: '20px' },
      }}
      open={open}
      onClose={handleReject}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle
        sx={{
          textAlign: 'center',

          fontSize: 'h5.fontSize',
          fontWeight: 'h5.fontWeight',
        }}
        id="alert-dialog-title"
      >
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText sx={{ textAlign: 'center' }} id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mt: 2 }}>
        <Button color="inherit" onClick={handleReject} autoFocus>
          Abbrechen
        </Button>
        <Button onClick={handleAccept} color="error" variant="contained" disabled={disabled}>
          Ja, weiter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WarningDialog;
