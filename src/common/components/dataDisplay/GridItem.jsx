import React from 'react';

import { Box, Grid } from '@mui/material';

function GridItem({ sx, ...props }) {
  return (
    <React.Fragment>
      <Grid sx={{ ...{ display: 'flex', alignItems: 'center' }, ...sx }} {...props}>
        <Box
          sx={{
            overflow: 'hidden',
            maxWidth: '480px',
            minWidth: 0,

            pr: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            wordBreak: 'break-all',

            '&:hover': {
              overflow: 'visible',
              position: 'absolute',
              maxWidth: '480px',
              backgroundColor: 'white',
              whiteSpace: 'normal',

              boxShadow: (theme) => theme.shadows[3],

              p: 0.8,

              borderRadius: (theme) => theme.spacing(1),
              zIndex: 1000,
            },
          }}
          color={props.color}
          fontStyle={props.fontStyle}
        >
          {props.children}
        </Box>
      </Grid>
    </React.Fragment>
  );
}

export default GridItem;
