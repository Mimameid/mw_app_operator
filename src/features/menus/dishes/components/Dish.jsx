import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeDish } from 'features/menus/categories/actions';

import { Box, Button, Chip, Collapse, Grid, IconButton } from '@mui/material';
import DishChoices from 'features/menus/dishes/components/DishChoices';
import EditDish from './EditDish';
import AddChoiceModal from 'features/menus/dishes/components/AddChoiceModal/AddChoiceModal';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import { Add, Delete, Edit, Remove } from '@mui/icons-material';

function Dish({ dishId, category }) {
  const dispatch = useDispatch();
  const dish = useSelector((state) => state.menus.dishes.byId[dishId]);

  const [show, setShow] = useState(true);
  const [editDishOpen, setEditDishOpen] = useState(false);
  const [addChoiceOpen, setAddChoiceOpen] = useState(false);

  const getFieldName = (label) => {
    switch (label) {
      case 'Vegan':
        return 'vegan';
      case 'Vegetarisch':
        return 'vegetarian';
      case 'Halal':
        return 'halal';
      case 'Glutenfrei':
        return 'gluten';
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
      <Box sx={{ height: '104px', p: 2 }} display="flex">
        <Box sx={{ width: '24px', ml: -1, paddingTop: '3px', alignSelf: 'flex-start' }} onClick={handleClickCollapse}>
          <IconButton
            sx={{
              cursor: 'pointer',
              '&:hover': {
                background: 'none',
              },
            }}
            disableRipple
            aria-label="edit"
            size="small"
          >
            {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
          </IconButton>
        </Box>
        <Box>
          <Grid container alignItems="center" wrap="nowrap">
            <TruncatedBox
              sx={{ cursor: 'pointer', userSelect: 'none' }}
              fontSize="subtitle1.fontSize"
              fontWeight="fontWeightBold"
              onClick={handleClickCollapse}
            >
              {dish.name}
            </TruncatedBox>
            <Grid sx={{ pl: 1 }} item>
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
            <Grid item sx={{ pl: 1 }}>
              <Button size="small" variant="outlined" color="primary" endIcon={<Add />} onClick={handleAddChoices}>
                Gruppe
              </Button>
            </Grid>
          </Grid>
          <TruncatedBox
            sx={{
              mt: '-4px',
              pt: 1,

              lineHeight: '24px',
            }}
            color="text.secondary"
            fontSize="subtitle2.fontSize"
            fontStyle="italic"
          >
            {dish.desc}
          </TruncatedBox>
        </Box>
        <Box
          sx={{ position: 'relative', ml: 'auto' }}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Box display="inline" color="primary.main" fontWeight="fontWeightBold" textAlign="right">
            {dish.price.toFixed(2)}€
          </Box>
          <Box color="text.secondary" fontSize="subtitle2.fontSize" fontStyle="italic" textAlign="right">
            {dish.type}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              display: 'flex',
              fontSize: 'subtitle2.fontSize',
              fontStyle: 'italic',
              textAlign: 'right',
            }}
            color="text.secondary"
          >
            {dish.cuisineLabels.map((label, _) => {
              return (
                <Chip
                  sx={{
                    margin: '2px 2px 0 2px',
                    color: (theme) => theme.palette.food_tags[getFieldName(label)].main,
                    bgcolor: (theme) => theme.palette.food_tags[getFieldName(label)].light,
                  }}
                  key={label}
                  label={label}
                  size="small"
                />
              );
            })}
          </Box>
        </Box>
      </Box>

      <Collapse in={show}>
        <Box
          sx={{
            p: 2,
            borderTop: (theme) => '1px solid' + theme.palette.grey[300],
          }}
        >
          <DishChoices dish={dish} />
        </Box>
      </Collapse>

      <EditDish open={editDishOpen} setOpen={setEditDishOpen} dish={dish} />
      <AddChoiceModal open={addChoiceOpen} setOpen={setAddChoiceOpen} dishId={dishId} />
    </div>
  );
}

export default Dish;
