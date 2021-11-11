import React from 'react';

import { Button, CircularProgress } from '@mui/material';

function LoadingButton({ loading, loadingText, ...props }) {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {!loading ? props.children : loadingText ? loadingText : <CircularProgress sx={{ ml: 2 }} size={20} />}
    </Button>
  );
}

export default LoadingButton;
