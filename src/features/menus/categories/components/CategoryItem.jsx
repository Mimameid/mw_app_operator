import React, { useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from '../categoriesSlice';
import { makeSelectAffectedMenus } from 'features/menus/menus/menusSlice';

import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import EditCategoryModal from './EditCategoryModal';
import WarningDialog from 'common/components/other/WarningDialog';
import { Delete, Edit } from '@material-ui/icons';

function CategoryItem({ category, checked, handleToggle }) {
  const dispatch = useDispatch();
  const selectAffectedMenus = useMemo(makeSelectAffectedMenus, []);
  const affectedMenus = useSelector((state) => selectAffectedMenus(state, category.id));

  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  function handleEditCategory() {
    if (affectedMenus.length > 0) {
      setEditDialogOpen(true);
      return;
    }
    setEditCategoryOpen(true);
  }

  function handleDeleteCategory() {
    setDeleteDialogOpen(true);
  }

  const handleRejectDialog = (event) => {
    if (editDialogOpen) {
      setEditDialogOpen(false);
    }
    if (deleteDialogOpen) {
      setDeleteDialogOpen(false);
    }
  };

  const handleAcceptDialog = (event) => {
    if (editDialogOpen) {
      setEditDialogOpen(false);
      setEditCategoryOpen(true);
    }

    if (deleteDialogOpen) {
      dispatch(deleteCategory(category.id));
      setDeleteDialogOpen(false);
    }
  };

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
            <Delete fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <EditCategoryModal open={editCategoryOpen} setOpen={setEditCategoryOpen} category={category} />
      <WarningDialog
        open={deleteDialogOpen}
        title="Kategorie löschen?"
        message={
          affectedMenus.length > 0
            ? 'Das Löschen der Kategorie löscht die Kategorie in sämtlichen Menüs. Betroffene Menüs: ' +
              affectedMenus.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie die Kategorie löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
      <WarningDialog
        open={editDialogOpen}
        title="Kategorie bearbeiten?"
        message={
          'Das Bearbeiten der Kategorie ändert die Kategorie in sämtlichen Menüs. Betroffene Menüs: ' +
          affectedMenus.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
    </React.Fragment>
  );
}

export default CategoryItem;
