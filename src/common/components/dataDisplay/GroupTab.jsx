import React from 'react';

import { Box, Tab } from '@mui/material';

function GroupTab({ selected, label, value, ...props }) {
  return (
    <React.Fragment>
      <Tab
        sx={{
          typography: { xs: 'caption', sm: 'body2' },
          minWidth: '96px',
          padding: '14px 12px',
          zIndex: 100,
          color: selected ? 'common.white' : null,
          backgroundColor: selected ? 'primary.main' : null,
          opacity: 1,

          borderRadius: selected ? '16px 16px 0 0' : null,
          boxShadow: (theme) => (selected ? theme.shadows[12] : null),
        }}
        value={value}
        label={<Box>{label}</Box>}
        {...props}
      />
    </React.Fragment>
  );
}

export default GroupTab;
