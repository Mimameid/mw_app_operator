import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addCategory } from 'features/menus/menus/menusSlice';

import { Box, Button, Divider, Grid, List, Modal, Paper, makeStyles } from '@material-ui/core';
import CategoryModal from 'features/menus/categories/components/CategoryModal';
import CategoryItem from './CategoryItem';

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
  },
  buttonsContainer: { paddingTop: theme.spacing(1) },
}));

function AddCategoryModal({ open, setOpen, menuId }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const categoriesArray = useSelector((state) => {
    const categoriesArray = Object.values(state.menus.categories.byId);
    categoriesArray.sort((a, b) => a.name.localeCompare(b.name));
    return categoriesArray;
  });

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [checked, setChecked] = useState([]);

  const handleClose = () => {
    setChecked([]);
    setOpen(false);
  };

  function handleCreateCategory(event) {
    setCategoryModalOpen(true);
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

  function handleAddCategories(event) {
    for (let categoryId of checked) {
      dispatch(addCategory({ categoryId, menuId }));
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
                Kategorien
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleCreateCategory}>
                Erstellen
              </Button>
            </Grid>
          </Grid>

          <Paper variant="outlined" square>
            <List className={classes.list}>
              {categoriesArray.length === 0 ? (
                <Box color="text.secondary" fontStyle="italic" p={1}>
                  Keine Kategorien verfügbar. Bitte erstellen Sie eine neue Kategorie...
                </Box>
              ) : (
                <React.Fragment>
                  {categoriesArray.map((category, index) => (
                    <React.Fragment key={nanoid()}>
                      <CategoryItem
                        category={category}
                        checked={checked.indexOf(category.id) !== -1}
                        handleToggle={handleToggle}
                      />
                      {index < categoriesArray.length - 1 ? (
                        <Divider />
                      ) : categoriesArray.length < 5 ? (
                        <Divider />
                      ) : null}
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
              <Button variant="contained" color="primary" onClick={handleAddCategories}>
                Hinzufügen
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
    </React.Fragment>
  );
}

export default AddCategoryModal;
