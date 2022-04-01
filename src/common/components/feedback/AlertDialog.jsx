import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  LinearProgress,
} from '@mui/material';

function AlertDialog({
  open,
  title,
  message,
  acceptText,
  rejectText,
  handleReject,
  handleAccept,
  loading,
  warning,
  disabled,
  ...props
}) {
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
      {...props}
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
        {loading ? (
          <LinearProgress
            sx={{
              position: 'absolute',
              width: '100%',

              top: 0,
              left: 0,
              right: 0,
            }}
          />
        ) : null}
        {typeof message === 'string' ? (
          <DialogContentText sx={{ textAlign: 'center' }} id="alert-dialog-description">
            {message}
          </DialogContentText>
        ) : (
          message
        )}
      </DialogContent>
      <DialogActions sx={{ mt: 2 }}>
        {handleReject ? (
          <Button color="inherit" onClick={handleReject} autoFocus>
            {rejectText ? rejectText : 'Abbrechen'}
          </Button>
        ) : null}

        {handleAccept ? (
          <Button
            onClick={loading ? null : handleAccept}
            color={warning ? 'error' : 'primary'}
            variant="contained"
            disabled={disabled}
          >
            {acceptText ? acceptText : 'Ja, weiter'}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(AlertDialog);
