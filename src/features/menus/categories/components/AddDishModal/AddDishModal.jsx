import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDish } from 'features/menus/categories/categoriesSlice';

import { Box, Button, Divider, Grid, List, Modal, Paper, makeStyles } from '@material-ui/core';
import DishItem from './DishItem';
import DishModal from 'features/menus/dishes/components/DishModal';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  formContainer: {
    position: 'absolute',
    width: '40%',
    left: '50%',
    top: '50%',
    padding: theme.spacing(2),

    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  list: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: 320,
    height: 304,
    padding: 0,

    backgroundColor: theme.palette.background.paper,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  listHeader: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid ' + theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  buttonsContainer: { paddingTop: theme.spacing(1) },
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

  function handleAddDishes(event) {
    for (let dishId of checked) {
      dispatch(addDish({ dishId, categoryId }));
    }

    handleClose();
  }

  return (
    <React.Fragment>
      <Modal className={classes.backdrop} open={open} onClose={handleClose}>
        <Paper className={classes.formContainer}>
          <Grid className={classes.buttonsContainer} container justify="space-between">
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
          <Grid className={classes.buttonsContainer} container justify="flex-end" spacing={1}>
            <Grid item>
              <Button variant="contained" onClick={handleClose}>
                Abbrechen
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleAddDishes}>
                Hinzufügen
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <DishModal open={dishModalOpen} onClose={() => setDishModalOpen(false)} />
    </React.Fragment>
  );
}

export default AddDishModal;
