import React from 'react';

import {
  Button,
  Grid,
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useMediaQuery,
  useTheme,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    lineHeight: 'normal',
  },
  dialogContainer: {
    maxWidth: '520px',
    width: '100%',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),

    padding: theme.spacing(4),

    zIndex: 1000,
  },

  dialogActions: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    marginTop: theme.spacing(3),
  },
}));

function ResponsiveModal({ open, header, acceptLabel, onCancel, onAccept, children }) {
  const classes = useStyles();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Dialog
      className={classes.backdrop}
      PaperProps={{ className: classes.dialogContainer }}
      open={open}
      scroll="body"
      fullScreen={!match}
    >
      <DialogTitle>
        {typeof header === 'string' ? (
          <Box fontSize={'h5.fontSize'} color="primary.main">
            {header}
          </Box>
        ) : (
          header
        )}
      </DialogTitle>

      <DialogContent>
        <div style={{ paddingBottom: '1px' }}>{children}</div>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Grid container item justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button variant="contained" onClick={onCancel}>
              Abbrechen
            </Button>
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={onAccept}>
              {acceptLabel ? acceptLabel : 'Weiter'}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default ResponsiveModal;
