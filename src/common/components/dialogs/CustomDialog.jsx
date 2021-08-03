import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
  },
}));

function CustomDialog({ open, title, message, handleReject, handleAccept }) {
  const classes = useStyles(makeStyles);
  return (
    <Dialog
      PaperProps={{
        className: classes.dialog,
      }}
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
        <Button onClick={handleReject} autoFocus variant="contained">
          Abbrechen
        </Button>
        <Button onClick={handleAccept} color="primary" variant="contained">
          Weiter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
