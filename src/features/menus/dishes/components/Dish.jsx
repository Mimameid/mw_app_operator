import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeDish } from 'features/menus/categories/actions';

import { Box, Button, Chip, Collapse, Grid, IconButton, makeStyles } from '@material-ui/core';
import DishChoices from 'features/menus/dishes/components/DishChoices';
import EditDish from './EditDish';
import AddChoiceModal from 'features/menus/dishes/components/AddChoiceModal/AddChoiceModal';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import { Add, Delete, Edit, Remove } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    height: '104px',
    padding: theme.spacing(2),
  },
  headerDivider: {
    borderBottom: '1px solid ' + theme.palette.grey[300],
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

  infoContainer: {
    marginLeft: 'auto',
  },
  contentContainer: {
    padding: theme.spacing(2),

    borderTop: '1px solid' + theme.palette.grey[300],
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

  const getLabelClass = (label) => {
    switch (label) {
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
    <div>
      <Box className={`${classes.headerContainer}`} display="flex">
        <Box className={classes.collapseIconContainer} onClick={handleClickCollapse}>
          <IconButton className={classes.collapseIcon} disableRipple aria-label="edit" size="small">
            {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
          </IconButton>
        </Box>
        <Box>
          <Grid container alignItems="center" wrap="nowrap">
            <TruncatedBox
              className={classes.title}
              fontSize="subtitle1.fontSize"
              fontWeight="fontWeightBold"
              onClick={handleClickCollapse}
            >
              {dish.name}
            </TruncatedBox>
            <Grid className={classes.buttonsContainer} item>
              <Box display="flex" flexWrap="nowrap">
                <IconButton aria-label="edit" size="small" onClick={handleEditDish}>
                  <Edit fontSize="small" />
                </IconButton>
                {category ? (
                  <IconButton aria-label="edit" size="small" onClick={handleRemoveDish}>
                    <Delete fontSize="small" />
                  </IconButton>
                ) : null}
              </Box>
            </Grid>
            <Grid item className={classes.buttonsContainer}>
              <Button size="small" variant="outlined" color="primary" endIcon={<Add />} onClick={handleAddChoices}>
                Gruppe
              </Button>
            </Grid>
          </Grid>
          <TruncatedBox
            className={classes.subtitle}
            color="text.secondary"
            fontSize="subtitle2.fontSize"
            fontStyle="italic"
          >
            {dish.desc}
          </TruncatedBox>
        </Box>
        <Box className={classes.infoContainer} display="flex" flexDirection="column" justifyContent="space-around">
          <Box display="inline" color="primary.main" fontWeight="fontWeightBold" textAlign="right">
            {dish.price}€
          </Box>
          <Box color="text.secondary" fontSize="subtitle2.fontSize" fontStyle="italic" textAlign="right">
            {dish.type}
          </Box>
          <Box color="text.secondary" fontSize="subtitle2.fontSize" fontStyle="italic" textAlign="right">
            {dish.cuisineLabels.map((label, _) => {
              return <Chip className={getLabelClass(label)} key={label} label={label} size="small" />;
            })}
          </Box>
        </Box>
      </Box>

      <Collapse in={show}>
        <Box className={classes.contentContainer}>
          <DishChoices dish={dish} />
        </Box>
      </Collapse>

      <EditDish open={editDishOpen} setOpen={setEditDishOpen} dish={dish} />
      <AddChoiceModal open={addChoiceOpen} setOpen={setAddChoiceOpen} dishId={dishId} />
    </div>
  );
}

export default Dish;
