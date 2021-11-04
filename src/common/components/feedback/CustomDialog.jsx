import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

function CustomDialog({ open, title, message, acceptText, rejectText, handleReject, handleAccept }) {
  return (
    <Dialog
      PaperProps={{
        sx: { p: 3 },
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
          {rejectText ? rejectText : 'Abbrechen'}
        </Button>
        <Button onClick={handleAccept} color="primary" variant="contained">
          {acceptText ? acceptText : 'Ja, weiter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
