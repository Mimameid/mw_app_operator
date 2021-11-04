import React from 'react';
import { Box, Grid } from '@mui/material';

function GridHeaderItem(props) {
  return (
    <React.Fragment>
      <Grid sx={{ display: 'flex', alignItems: 'center' }} {...props}>
        <Box
          sx={{
            typography: { xs: 'caption', sm: 'subtitle2' },
            overflow: 'hidden',
            px: 1,
            py: 1.5,
            maxWidth: '480px',

            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            wordBreak: 'break-all',
          }}
          style={{ color: props.color, fontStyle: props.fontStyle }}
        >
          {props.children}
        </Box>
      </Grid>
    </React.Fragment>
  );
}

export default GridHeaderItem;
