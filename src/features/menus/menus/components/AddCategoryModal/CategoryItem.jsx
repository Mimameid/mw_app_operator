import React, { useState } from 'react';

import { Box, Checkbox, IconButton, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import EditCategory from '../../../categories/components/EditCategory';
import DeleteCategory from '../../../categories/components/DeleteCategory';
import { DeleteForever, Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: 'block',
    overflow: 'hidden',
    paddingRight: theme.spacing(2),
    maxWidth: '220px',

    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  checkBoxContainer: {
    minWidth: '32px',
  },
}));

function CategoryItem({ category, checked, handleToggle }) {
  const classes = useStyles();
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
        <ListItemIcon className={classes.checkBoxContainer}>
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
        <ListItemText
          id={category.id}
          primary={<span className={classes.textContainer}>{category.name}</span>}
          secondary={<span className={classes.textContainer}>{category.desc}</span>}
        />
        <Box display="flex">
          <IconButton edge="end" aria-label="edit" onClick={handleEditCategory}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteCategory}>
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
