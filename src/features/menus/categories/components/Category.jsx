import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory, makeSelectAffectedMenus } from 'features/menus/menus/menusSlice';
import { selectCategory } from 'features/menus/categories/categoriesSlice';

import { Box, Grid, Button, Paper, IconButton, Collapse, makeStyles } from '@material-ui/core';
import Dishes from 'features/menus/dishes/components/Dishes';
import WarningDialog from 'common/components/other/WarningDialog';
import EditCategoryModal from './EditCategoryModal';
import { Add, Delete, Edit, ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  containerPadding: {
    padding: theme.spacing(1),
  },
  buttonsContainer: {
    paddingLeft: theme.spacing(2),
  },
  pointerCursor: {
    cursor: 'pointer',
  },
}));

function Category({ categoryId, setAddDishOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectAffectedMenus = useMemo(makeSelectAffectedMenus, []);
  const affectedMenus = useSelector((state) => selectAffectedMenus(state, categoryId));
  const category = useSelector((state) => state.menus.categories.byId[categoryId]);

  const [show, setShow] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);

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
    dispatch(removeCategory(categoryId));
  }

  function handleAddDishes() {
    dispatch(selectCategory(categoryId));
    setAddDishOpen(true);
  }

  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <Paper elevation={0}>
      <Grid className={classes.containerPadding} direction="row" container>
        <Grid className={classes.pointerCursor} item onClick={handleClickCollapse}>
          <Box
            display="inline-block"
            color="primary.main"
            fontSize="subtitle1.fontSize"
            fontWeight="fontWeightBold"
            ml={0.5}
            mt={0.5}
          >
            {category.name}
          </Box>
          {category.dishes.length > 0 ? (
            <IconButton aria-label="edit" size="small">
              {show ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </IconButton>
          ) : null}
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
          <Collapse in={show}>
            <Dishes dishIds={category.dishes} />
          </Collapse>
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

export default Category;
