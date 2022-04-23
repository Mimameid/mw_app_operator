import React from 'react';

import { Checkbox, Grid, ListItem, ListItemIcon, ListItemText } from '@mui/material';

function SubItem({ item, checked, handleToggle }) {
  return (
    <React.Fragment>
      <ListItem dense button onClick={handleToggle(item.id)}>
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <Checkbox
            color="primary"
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            size="small"
            inputProps={{ 'aria-labelledby': item.id }}
          />
        </ListItemIcon>
        <Grid container justifyContent="flex-start">
          <Grid item xs={8}>
            <ListItemText primary={item.name} secondary={item.desc} />
          </Grid>
          <Grid item xs={4}>
            <ListItemText primary={item.price.toFixed(2) + '€'} />
          </Grid>
        </Grid>
      </ListItem>
    </React.Fragment>
  );
}

export default SubItem;
