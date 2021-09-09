import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory } from 'features/menus/menus/actions';

import { Box, Grid, Button, Paper, IconButton, Collapse, makeStyles } from '@material-ui/core';
import CategoryDishes from 'features/menus/categories/components/CategoryDishes';
import { Add, Delete, Edit, Remove } from '@material-ui/icons';
import EditCategory from './EditCategory';
import AddDishModal from 'features/menus/categories/components/AddDishModal/AddDishModal';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    padding: theme.spacing(2),

    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid ' + theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  collapseIconContainer: {
    width: '24px',
    marginLeft: theme.spacing(-1),
    paddingTop: '3px',
    alignSelf: 'flex-start',
  },
  collapseIcon: {
    cursor: 'pointer',
    '&:hover': {
      background: 'none',
    },
  },
  title: {
    cursor: 'pointer',

    userSelect: 'none',
  },
  subtitle: {
    marginTop: '-4px',
    paddingTop: theme.spacing(1),

    lineHeight: '24px',
  },
  buttonsContainer: {
    paddingLeft: theme.spacing(1),
  },

  contentContainer: {
    padding: theme.spacing(2),
  },
}));

function Category({ categoryId, menu }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.menus.categories);
  console.log(categories);
  console.log(categoryId);
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

  console.log(category);
  return (
    <Paper elevation={0}>
      <Box className={classes.headerContainer} display="flex">
        <Box className={classes.collapseIconContainer} onClick={handleClickCollapse}>
          <IconButton className={classes.collapseIcon} disableRipple aria-label="edit" color="inherit" size="small">
            {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
          </IconButton>
        </Box>
        <Box>
          <Grid container alignItems="center">
            <TruncatedBox
              className={classes.title}
              fontSize="subtitle1.fontSize"
              fontWeight="fontWeightBold"
              onClick={handleClickCollapse}
            >
              {category.name}
            </TruncatedBox>
            <Grid className={classes.buttonsContainer} item>
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
          <TruncatedBox className={classes.subtitle} fontSize="subtitle2.fontSize" fontStyle="italic">
            {category.desc}
          </TruncatedBox>
        </Box>
      </Box>

      <Collapse in={show}>
        <Box className={classes.contentContainer}>
          <CategoryDishes category={category} />
        </Box>
      </Collapse>

      <EditCategory open={editCategoryOpen} setOpen={setEditCategoryOpen} category={category} />
      <AddDishModal open={addDishOpen} setOpen={setAddDishOpen} categoryId={category.id} />
    </Paper>
  );
}

export default Category;
