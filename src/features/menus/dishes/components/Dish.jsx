import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeDish } from 'features/menus/categories/categoriesSlice';

import { Avatar, Box, Button, Chip, Collapse, Grid, IconButton, makeStyles } from '@material-ui/core';
import DishChoices from 'features/menus/dishes/components/DishChoices';
import EditDish from './EditDish';
import AddChoiceModal from 'features/menus/dishes/components/AddChoiceModal/AddChoiceModal';
import { Add, Delete, Edit, Remove } from '@material-ui/icons';

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
  halal: {
    margin: '2px 2px 0 2px',
    color: theme.palette.food_tags.halal.main,
    backgroundColor: theme.palette.food_tags.halal.light,
  },
  vegan: {
    margin: '2px 2px 0 2px',
    color: theme.palette.food_tags.vegan.main,
    backgroundColor: theme.palette.food_tags.vegan.light,
  },
  vegetarian: {
    margin: '2px 2px 0 2px',
    color: theme.palette.food_tags.vegetarian.main,
    backgroundColor: theme.palette.food_tags.vegetarian.light,
  },
  kosher: {
    margin: '2px 2px 0 2px',
    color: theme.palette.food_tags.kosher.main,
    backgroundColor: theme.palette.food_tags.kosher.light,
  },
  gluten: {
    margin: '2px 2px 0 2px',
    color: theme.palette.food_tags.gluten.main,
    backgroundColor: theme.palette.food_tags.gluten.light,
  },
}));

function Dish({ dishId, category }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dish = useSelector((state) => state.menus.dishes.byId[dishId]);

  const [show, setShow] = useState(true);
  const [editDishOpen, setEditDishOpen] = useState(false);
  const [addChoiceOpen, setAddChoiceOpen] = useState(false);

  const getTagClass = (tag) => {
    console.log(tag);
    switch (tag) {
      case 'Vegan':
        return classes.vegan;
      case 'Vegetarisch':
        return classes.vegetarian;
      case 'Halal':
        return classes.halal;
      case 'Koscher':
        return classes.kosher;
      case 'Glutenfrei':
        return classes.gluten;
      default:
        return null;
    }
  };

  function handleEditDish() {
    setEditDishOpen(true);
  }

  const handleRemoveDish = (event) => {
    dispatch(removeDish({ dishId, categoryId: category.id }));
  };

  function handleAddChoices() {
    setAddChoiceOpen(true);
  }

  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <Grid className={classes.horizontalLayout} direction="column" container>
      <Grid item>
        <Box className={classes.pointerCursor} display="inline" pr={1} onClick={handleClickCollapse}>
          <Box display="inline">
            {dish.choices.length > 0 ? (
              <IconButton aria-label="edit" size="small">
                {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
              </IconButton>
            ) : null}
          </Box>
          <Box className={classes.title} display="inline" fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
            {dish.name}
          </Box>
        </Box>

        <IconButton aria-label="edit dish" size="small" onClick={handleEditDish}>
          <Edit fontSize="small" />
        </IconButton>
        {category ? (
          <IconButton aria-label="delete dish" size="small" onClick={handleRemoveDish}>
            <Delete fontSize="small" />
          </IconButton>
        ) : null}

        <Button
          className={classes.marginLeft}
          size="small"
          variant="outlined"
          color="primary"
          endIcon={<Add />}
          onClick={handleAddChoices}
        >
          Optiongruppe
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
        <Box display="inline" color="primary.main" fontWeight="fontWeightBold">
          {dish.price}€
        </Box>
        <Box className={classes.floatRight} color="text.secondary" fontSize="subtitle2.fontSize" fontStyle="italic">
          {dish.tags.map((tag, _) => {
            return <Chip className={getTagClass(tag)} key={tag} label={tag} size="small" />;
          })}
        </Box>
      </Grid>
      <Grid item>
        <Collapse in={show}>
          <DishChoices dish={dish} />
        </Collapse>
      </Grid>
      <EditDish open={editDishOpen} setOpen={setEditDishOpen} dish={dish} />
      <AddChoiceModal open={addChoiceOpen} setOpen={setAddChoiceOpen} dishId={dishId} />
    </Grid>
  );
}

export default Dish;
