import React from 'react';

import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@mui/material';

function CategoryItem({ item, checked, handleToggle }) {
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
        <ListItemText id={item.id} primary={item.name} secondary={item.desc} />
      </ListItem>
    </React.Fragment>
  );
}

export default CategoryItem;
