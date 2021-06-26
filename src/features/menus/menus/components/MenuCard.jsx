import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import MenuCategories from 'features/menus/categories/components/MenuCategories';
import AddCategoryModal from 'features/menus/categories/components/AddCategoryModal';
import { Box, Button, Grid, Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <React.Fragment>
      {activeMenu ? (
        <Paper variant="outlined">
          <Grid className={classes.containerPadding} container>
            <Grid item>
              <Box color="primary" fontSize="h6.fontSize" ml={1} mt={1}>
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
          <MenuCategories />
          <AddCategoryModal open={addCategoryOpen} setOpen={setAddCategoryOpen} />
        </Paper>
      ) : null}
    </React.Fragment>
  );
}

export default MenuCard;
