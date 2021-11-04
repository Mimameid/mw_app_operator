import React, { useState } from 'react';

import { Box, Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EditCategory from '../../../categories/components/EditCategory';
import DeleteCategory from '../../../categories/components/DeleteCategory';
import { DeleteForever, Edit } from '@mui/icons-material';

function CategoryItem({ category, checked, handleToggle }) {
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  function handleEditCategory(event) {
    setEditCategoryOpen(true);
    event.stopPropagation();
  }

  function handleDeleteCategory(event) {
    setTriggerDelete(true);
    event.stopPropagation();
  }

  return (
    <React.Fragment>
      <ListItem dense button onClick={handleToggle(category.id)}>
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <Checkbox
            color="primary"
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            size="small"
            inputProps={{ 'aria-labelledby': category.id }}
          />
        </ListItemIcon>
        <ListItemText id={category.id} primary={category.name} secondary={category.desc} />
        <Box display="flex">
          <IconButton edge="end" aria-label="edit" onClick={handleEditCategory} size="large">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteCategory} size="large">
            <DeleteForever fontSize="small" color="error" />
          </IconButton>
        </Box>
      </ListItem>
      <EditCategory open={editCategoryOpen} setOpen={setEditCategoryOpen} category={category} />
      <DeleteCategory trigger={triggerDelete} setTrigger={setTriggerDelete} categoryId={category.id} />
    </React.Fragment>
  );
}

export default CategoryItem;
