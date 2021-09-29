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
  dialogActions: {
    marginTop: theme.spacing(2),
  },
}));

function CustomDialog({ open, title, message, acceptText, rejectText, handleReject, handleAccept }) {
  const classes = useStyles(makeStyles);
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
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleReject} autoFocus>
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
