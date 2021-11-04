import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Delete, FilterList } from '@mui/icons-material';

import React from 'react';

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" size="large">
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" size="large">
            <FilterList />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
export default EnhancedTableToolbar;
