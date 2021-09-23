import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategories } from 'features/menus/menus/actions';

import { Box, Button, Divider, Grid, List, Paper, makeStyles } from '@material-ui/core';
import CategoryModal from 'features/menus/categories/components/CategoryModal';
import CategoryItem from './CategoryItem';
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
      <ResponsiveModal
        open={open}
        header={
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
        }
        acceptLabel={'Hinzufügen'}
        onCancel={handleClose}
        onAccept={handleAddCategories}
      >
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
                    {index < categoriesArray.length - 1 ? <Divider /> : categoriesArray.length < 5 ? <Divider /> : null}
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </List>
        </Paper>
      </ResponsiveModal>
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
    </React.Fragment>
  );
}

export default AddCategoryModal;
