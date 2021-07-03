import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Button, Grid, Paper, makeStyles } from '@material-ui/core';
import Categories from 'features/menus/categories/components/Categories';
import AddCategoryModal from 'features/menus/categories/components/AddCategoryModal';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  containerPadding: {
    padding: theme.spacing(1),
  },
}));

function MenuCard() {
  const classes = useStyles();

  const activeMenu = useSelector((state) => state.menus.menus.activeMenu);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  function handleAddCategories(event) {
    setAddCategoryOpen(true);
  }

  return activeMenu ? (
    <Paper variant="outlined">
      <Grid className={classes.containerPadding} container>
        <Grid item>
          <Box color="primary" fontSize="h6.fontSize" fontWeight="fontWeightMedium" ml={1} mt={1}>
            Speisekarte
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" justifyContent="space-between" p={1}>
            <Button variant="outlined" color="primary" endIcon={<Add />} onClick={handleAddCategories}>
              Kategorie
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Categories />
      <AddCategoryModal open={addCategoryOpen} setOpen={setAddCategoryOpen} />
    </Paper>
  ) : null;
}

export default MenuCard;
