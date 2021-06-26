import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addCategory } from 'features/menus/menus/menusSlice';

import { Box, Button, Divider, Grid, List, Modal, Paper } from '@material-ui/core';
import CreateCategoryModal from './CreateCategoryModal';
import CategoryItem from './CategoryItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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

function AddCategoryModal({ open, setOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.menus.categories.byId);
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);

  const [checked, setChecked] = useState([]);
  const handleClose = () => {
    setChecked([]);
    setOpen(false);
  };

  function handleCreateCategory(event) {
    setCreateCategoryOpen(true);
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
    for (let elem of checked) {
      dispatch(addCategory(categories[elem]));
    }
    handleClose();
  }

  let categoriesArray = Object.values(categories);
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
      <CreateCategoryModal open={createCategoryOpen} setOpen={setCreateCategoryOpen} />
    </React.Fragment>
  );
}

export default AddCategoryModal;
