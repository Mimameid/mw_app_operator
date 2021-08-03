import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  warningIcon: {
    marginTop: theme.spacing(1),

    color: theme.palette.warning.main,

    fontSize: '32px',
  },
  dialogContentTitle: {
    textAlign: 'center',

    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
  },
  dialogContentText: {
    textAlign: 'center',
  },
  errorColor: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

function WarningDialog({ open, title, message, handleReject, handleAccept, disabled }) {
  const classes = useStyles();

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
      <DialogTitle className={classes.dialogContentTitle} id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText className={classes.dialogContentText} id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReject} autoFocus>
          Abbrechen
        </Button>
        <Button
          className={classes.errorColor}
          onClick={handleAccept}
          color="secondary"
          variant="contained"
          disabled={disabled}
        >
          Ja, weiter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WarningDialog;
