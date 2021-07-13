import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Button, Grid, Paper, makeStyles, IconButton } from '@material-ui/core';
import MenuCategories from 'features/menus/menus/components/MenuCategories';
import AddCategoryModal from 'features/menus/menus/components/AddCategoryModal/AddCategoryModal';
import { Add, Edit } from '@material-ui/icons';
import MenuModal from './MenuModal';

const useStyles = makeStyles((theme) => ({
  containerPadding: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
}));

function Menu() {
  const classes = useStyles();
  const menuId = useSelector((state) => state.menus.views.itemId);
  const menu = useSelector((state) => state.menus.menus.byId[menuId]);

  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  function handleAddCategories(event) {
    setAddCategoryOpen(true);
  }
  function handleEditMenu(event) {
    setMenuModalOpen(true);
  }

  return (
    <Paper elevation={3}>
      {menuId ? (
        <React.Fragment>
          <Grid className={classes.containerPadding} direction="row" alignItems="center" container>
            <Grid item>
              <Box color="primary" fontSize="h5.fontSize" fontWeight="fontWeightMedium">
                {menu.name}
              </Box>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <IconButton aria-label="edit" size="small" onClick={handleEditMenu}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Box display="flex" justifyContent="space-between" p={1}>
                    <Button variant="outlined" color="primary" endIcon={<Add />} onClick={handleAddCategories}>
                      Kategorie
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <MenuCategories menu={menu} />
          <AddCategoryModal open={addCategoryOpen} setOpen={setAddCategoryOpen} menuId={menuId} />
          <MenuModal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} menu={menu} />
        </React.Fragment>
      ) : null}
    </Paper>
  );
}

export default Menu;
