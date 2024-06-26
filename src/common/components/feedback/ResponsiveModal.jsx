import React from 'react';

import {
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useMediaQuery,
  useTheme,
  Box,
  LinearProgress,
} from '@mui/material';

function ResponsiveModal({ open, header, acceptLabel, onCancel, onAccept, children, disabled, loading, ...props }) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, lineHeight: 'normal' }}
      PaperProps={{
        sx: {
          width: '100%',
          p: 4,
          zIndex: 1000,
        },
      }}
      open={open}
      scroll="body"
      fullScreen={match}
      {...props}
    >
      <DialogTitle>
        {' '}
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
      <DialogActions sx={{ pr: 3, pl: 4, mt: 3 }}>
        <Grid container item justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button color="inherit" onClick={onCancel}>
              Abbrechen
            </Button>
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={loading ? null : onAccept} disabled={disabled}>
              {acceptLabel ? acceptLabel : 'Weiter'}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
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
    </Dialog>
  );
}

export default ResponsiveModal;
