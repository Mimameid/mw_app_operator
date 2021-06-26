import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory, makeSelectAffectedMenus } from 'features/menus/menus/menusSlice';
import { selectCategory } from 'features/menus/categories/categoriesSlice';

import { Box, Grid, Button, Paper, IconButton } from '@material-ui/core';
import CategoryDishes from 'features/menus/dishes/components/CategoryDishes';
import WarningDialog from 'common/components/other/WarningDialog';
import EditCategoryModal from './EditCategoryModal';
import { Add, Delete, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerPadding: {
    padding: theme.spacing(1),
  },
  buttonsContainer: {
    paddingLeft: theme.spacing(2),
  },
}));

function MenuCategory({ category, setAddDishOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectAffectedMenus = useMemo(makeSelectAffectedMenus, []);
  const affectedMenus = useSelector((state) => selectAffectedMenus(state, category.id));

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);

  function handleEditCategory(event) {
    setEditCategoryOpen(true);
  }

  function handleEditCategory() {
    if (affectedMenus.length > 0) {
      setEditDialogOpen(true);
      return;
    }
    setEditCategoryOpen(true);
  }

  const handleRejectDialog = (event) => {
    setEditDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setEditDialogOpen(false);
    setEditCategoryOpen(true);
  };

  function handleRemoveCategory(event) {
    dispatch(removeCategory(category.id));
  }

  function handleAddDishes() {
    dispatch(selectCategory(category.id));
    setAddDishOpen(true);
  }

  return (
    <Paper elevation={0}>
      <Grid className={classes.containerPadding} direction="row" container>
        <Grid item>
          <Box color="primary.main" fontSize="subtitle1.fontSize" ml={0.5} mt={0.5}>
            {category.name}
          </Box>
        </Grid>
        <Grid className={classes.buttonsContainer} item>
          <Grid container>
            <Grid item>
              <IconButton aria-label="edit" size="small" onClick={handleEditCategory}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton aria-label="edit" size="small" onClick={handleRemoveCategory}>
                <Delete fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item className={classes.buttonsContainer}>
              <Button size="small" variant="outlined" color="primary" endIcon={<Add />} onClick={handleAddDishes}>
                Speise
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.containerPadding} direction="column" container>
        <Grid item>
          <CategoryDishes dishes={category.dishes} />
        </Grid>
      </Grid>
      <EditCategoryModal open={editCategoryOpen} setOpen={setEditCategoryOpen} category={category} />
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
    </Paper>
  );
}

export default MenuCategory;
