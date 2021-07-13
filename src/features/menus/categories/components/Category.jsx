import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory } from 'features/menus/menus/menusSlice';

import { Box, Grid, Button, Paper, IconButton, Collapse, makeStyles, ListSubheader } from '@material-ui/core';
import CategoryDishes from 'features/menus/categories/components/CategoryDishes';

import { Add, Delete, Edit, Remove } from '@material-ui/icons';
import EditCategory from './EditCategory';
import AddDishModal from 'features/menus/categories/components/AddDishModal/AddDishModal';

const useStyles = makeStyles((theme) => ({
  containerPadding: {
    padding: theme.spacing(1),
    paddingBottom: '0',
  },
  listHeader: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid ' + theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  subtitle: {
    marginTop: '-4px',
    padding: theme.spacing(1),
    paddingTop: '0',

    lineHeight: '24px',
  },
  buttonsContainer: {
    paddingLeft: theme.spacing(1),
  },
  pointerCursor: {
    cursor: 'pointer',
  },
}));

function Category({ categoryId, menu }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const category = useSelector((state) => state.menus.categories.byId[categoryId]);

  const [show, setShow] = useState(true);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [addDishOpen, setAddDishOpen] = useState(false);

  function handleEditCategory() {
    setEditCategoryOpen(true);
  }

  function handleRemoveCategory(event) {
    dispatch(removeCategory({ categoryId, menuId: menu.id }));
  }

  function handleAddDishes() {
    setAddDishOpen(true);
  }

  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <Paper elevation={0}>
      <ListSubheader className={classes.listHeader}>
        <Grid className={classes.containerPadding} direction="row" container>
          <Grid className={classes.pointerCursor} item onClick={handleClickCollapse}>
            {category.dishes.length > 0 ? (
              <IconButton aria-label="edit" color="inherit" size="small">
                {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
              </IconButton>
            ) : null}
            <Box display="inline-block" fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
              {category.name}
            </Box>
          </Grid>
          <Grid className={classes.buttonsContainer} item>
            <Grid container>
              <Grid item>
                <IconButton aria-label="edit" color="inherit" size="small" onClick={handleEditCategory}>
                  <Edit fontSize="small" />
                </IconButton>
                {menu ? (
                  <IconButton aria-label="edit" color="inherit" size="small" onClick={handleRemoveCategory}>
                    <Delete fontSize="small" />
                  </IconButton>
                ) : null}
              </Grid>
              <Grid item className={classes.buttonsContainer}>
                <Button size="small" variant="outlined" color="inherit" endIcon={<Add />} onClick={handleAddDishes}>
                  Speise
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box className={classes.subtitle} fontSize="subtitle2.fontSize" fontStyle="italic">
          {category.desc}
        </Box>
      </ListSubheader>
      {category.dishes.length > 0 ? (
        <Collapse in={show}>
          <Grid className={classes.containerPadding} direction="column" container>
            <Grid item>
              <CategoryDishes category={category} />
            </Grid>
          </Grid>
        </Collapse>
      ) : (
        <Box color="text.secondary" fontStyle="italic" p={1}>
          Keine Speisen verfügbar. Bitte fügen Sie eine Speise hinzu...
        </Box>
      )}
      <EditCategory open={editCategoryOpen} setOpen={setEditCategoryOpen} category={category} />
      <AddDishModal open={addDishOpen} setOpen={setAddDishOpen} categoryId={categoryId} />
    </Paper>
  );
}

export default Category;
