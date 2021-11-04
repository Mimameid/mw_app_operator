import React from 'react';
import { Grid } from '@mui/material';

function GridHeaderItem(props) {
  return (
    <React.Fragment>
      <Grid sx={{ display: 'flex', alignItems: 'center' }} {...props}>
        <span
          sx={{
            typography: { xs: 'caption' },
            overflow: 'hidden',
            pl: 1,
            pr: 1,
            maxWidth: '480px',

            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            wordBreak: 'break-all',
          }}
          style={{ color: props.color, fontStyle: props.fontStyle }}
        >
          {props.children}
        </span>
      </Grid>
    </React.Fragment>
  );
}

export default GridHeaderItem;
