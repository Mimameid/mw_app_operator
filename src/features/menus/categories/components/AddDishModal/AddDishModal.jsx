import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDishes } from 'features/menus/categories/actions';

import { Box, Button, Divider, Grid, List, Paper, makeStyles } from '@material-ui/core';
import DishItem from './DishItem';
import DishModal from 'features/menus/dishes/components/DishModal';
import ResponsiveModal from 'common/components/other/ResponsiveModal';
const useStyles = makeStyles((theme) => ({
  list: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: 320,
    height: '304px',
    padding: 0,
  },
}));

function AddDishModal({ open, setOpen, categoryId }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const dishesArray = useSelector((state) => {
    let dishesArray = Object.values(state.menus.dishes.byId);
    dishesArray.sort((a, b) => a.name.localeCompare(b.name));
    return dishesArray;
  });

  const [dishModalOpen, setDishModalOpen] = useState(false);

  const [checked, setChecked] = useState([]);

  const handleClose = () => {
    setChecked([]);
    setOpen(false);
  };

  function handleCreateDish(event) {
    setDishModalOpen(true);
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  async function handleAddDishes(event) {
    await dispatch(addDishes({ categoryId, dishes: checked }));
    handleClose();
  }

  return (
    <React.Fragment>
      <ResponsiveModal
        open={open}
        header={
          <Grid container justifyContent="space-between">
            <Grid item>
              <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
                Speisen
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleCreateDish}>
                Erstellen
              </Button>
            </Grid>
          </Grid>
        }
        acceptLabel={'Hinzufügen'}
        onCancel={handleClose}
        onAccept={handleAddDishes}
      >
        {/* <Grid container justifyContent="space-between">
            <Grid item>
              <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
                Speisen
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleCreateDish}>
                Erstellen
              </Button>
            </Grid>
          </Grid>  */}

        <Paper variant="outlined" square>
          <List className={classes.list} subheader={<li />}>
            {dishesArray.length === 0 ? (
              <Box color="text.secondary" fontStyle="italic" p={1}>
                Keine Speisen verfügbar. Bitte erstellen Sie eine neue Speise...
              </Box>
            ) : (
              <React.Fragment>
                {dishesArray.map((dish, index) => (
                  <React.Fragment key={dish.id}>
                    <DishItem dish={dish} checked={checked.indexOf(dish.id) !== -1} handleToggle={handleToggle} />
                    {index < dishesArray.length - 1 ? <Divider /> : dishesArray.length < 5 ? <Divider /> : null}
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </List>
        </Paper>
      </ResponsiveModal>
      <DishModal open={dishModalOpen} onClose={() => setDishModalOpen(false)} />
    </React.Fragment>
  );
}

export default AddDishModal;
