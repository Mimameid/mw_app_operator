import React, { useState } from 'react';

import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import EditCategory from '../../../categories/components/EditCategory';
import DeleteCategory from '../../../categories/components/DeleteCategory';
import { DeleteForever, Edit } from '@material-ui/icons';

function CategoryItem({ category, checked, handleToggle }) {
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  function handleEditCategory() {
    setEditCategoryOpen(true);
  }

  function handleDeleteCategory() {
    setTriggerDelete(true);
  }

  return (
    <React.Fragment>
      <ListItem dense button onClick={handleToggle(category.id)}>
        <ListItemIcon>
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
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={handleEditCategory}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteCategory}>
            <DeleteForever fontSize="small" color="error" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <EditCategory open={editCategoryOpen} setOpen={setEditCategoryOpen} category={category} />
      <DeleteCategory trigger={triggerDelete} setTrigger={setTriggerDelete} categoryId={category.id} />
    </React.Fragment>
  );
}

export default CategoryItem;
