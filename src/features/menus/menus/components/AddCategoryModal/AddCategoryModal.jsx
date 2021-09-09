import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'common/constants';
import { addCategories } from 'features/menus/menus/actions';

import { Box, Button, Divider, Grid, List, Modal, Paper, makeStyles } from '@material-ui/core';
import CategoryModal from 'features/menus/categories/components/CategoryModal';
import CategoryItem from './CategoryItem';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  formContainer: {
    position: 'absolute',
    width: '432px',
    left: '50%',
    top: '50%',
    padding: theme.spacing(4),

    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  list: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: 320,
    height: '304px',
    padding: 0,
  },
  buttonLayout: {
    marginTop: theme.spacing(3),
  },
}));

function AddCategoryModal({ open, setOpen, menu }) {
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

  async function handleAddCategories(event) {
    await dispatch(addCategories({ menuId: menu.id, categories: checked }));
    handleClose();
  }

  return (
    <React.Fragment>
      <Modal className={classes.backdrop} open={open} onClose={handleClose}>
        <Paper className={classes.formContainer}>
          <Grid container justifyContent="space-between">
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
                    <React.Fragment key={category.id}>
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
          <Grid className={classes.buttonLayout} container justifyContent="flex-end" spacing={2}>
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
