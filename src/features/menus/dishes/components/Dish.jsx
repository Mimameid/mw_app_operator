import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedCategories, removeDish } from 'features/menus/categories/categoriesSlice';
import { selectDish } from 'features/menus/dishes/dishesSlice';

import { Box, Button, Collapse, Grid, IconButton, makeStyles } from '@material-ui/core';
import EditDishModal from './EditDishModal';
import WarningDialog from 'common/components/other/WarningDialog';
import { Add, Delete, Edit, ExpandLess, ExpandMore } from '@material-ui/icons';
import Choices from 'features/menus/choices/components/Choices';

const useStyles = makeStyles((theme) => ({
  horizontalLayout: {
    padding: theme.spacing(2),
  },
  title: {
    verticalAlign: 'middle',
  },
  description: {
    paddingBottom: theme.spacing(2),
  },
  floatRight: {
    float: 'right',
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  pointerCursor: {
    cursor: 'pointer',
  },
}));

function Dish({ dishId, setAddChoiceOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dish = useSelector((state) => state.menus.dishes.byId[dishId]);
  const selectAffectedCategories = useMemo(makeSelectAffectedCategories, []);
  const affectedCategories = useSelector((state) => selectAffectedCategories(state, dish.id));

  const [show, setShow] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDishOpen, setEditDishOpen] = useState(false);

  function handleEditDish() {
    if (affectedCategories.length > 0) {
      setEditDialogOpen(true);
      return;
    }
    setEditDishOpen(true);
  }

  const handleRejectDialog = (event) => {
    setEditDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setEditDialogOpen(false);
    setEditDishOpen(true);
  };

  const handleRemoveDish = (event) => {
    dispatch(removeDish(dishId));
  };

  function handleAddChoices() {
    dispatch(selectDish(dishId));
    setAddChoiceOpen(true);
  }

  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <Grid className={classes.horizontalLayout} direction="column" container>
      <Grid item>
        <Box className={classes.pointerCursor} display="inline" pr={1} onClick={handleClickCollapse}>
          <Box className={classes.title} display="inline" fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
            {dish.name}
          </Box>
          <Box display="inline">
            {dish.choices.length > 0 ? (
              <IconButton aria-label="edit" size="small">
                {show ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
              </IconButton>
            ) : null}
          </Box>
        </Box>

        <IconButton aria-label="edit dish" size="small" onClick={handleEditDish}>
          <Edit fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete dish" size="small" onClick={handleRemoveDish}>
          <Delete fontSize="small" />
        </IconButton>

        <Button
          className={classes.marginLeft}
          size="small"
          variant="outlined"
          color="primary"
          endIcon={<Add />}
          onClick={handleAddChoices}
        >
          Extras
        </Button>
        <Box
          className={classes.floatRight}
          display="inline"
          color="text.secondary"
          fontSize="subtitle2.fontSize"
          fontStyle="italic"
          textAlign="right"
        >
          {dish.type}
        </Box>
      </Grid>
      <Grid className={classes.description} item>
        <Box color="text.secondary" fontSize="subtitle2.fontSize" fontStyle="italic">
          {dish.desc}
        </Box>
      </Grid>
      <Grid item>
        <Box color="primary.main" fontWeight="fontWeightBold">
          {dish.price}€
        </Box>
      </Grid>
      <Grid item>
        <Collapse in={show}>
          <Choices choiceIds={dish.choices} />
        </Collapse>
      </Grid>
      <EditDishModal open={editDishOpen} setOpen={setEditDishOpen} dish={dish} />
      <WarningDialog
        open={editDialogOpen}
        title="Speise bearbeiten?"
        message={
          'Das Bearbeiten der Speise ändert die Speise in sämtlichen Kategorien und sämtlichen Menüs in denen die Kategorie vorkommt. Betroffene Kategorien: ' +
          affectedCategories.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
    </Grid>
  );
}

export default Dish;
