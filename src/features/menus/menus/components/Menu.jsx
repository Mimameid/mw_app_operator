import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Button, Grid, Paper, IconButton, Collapse, makeStyles } from '@material-ui/core';
import MenuCategories from 'features/menus/menus/components/MenuCategories';
import AddCategoryModal from 'features/menus/menus/components/AddCategoryModal/AddCategoryModal';

import MenuModal from './MenuModal';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import { Add, Edit, Remove } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    padding: theme.spacing(2),

    borderBottom: '1px solid ' + theme.palette.grey[300],
  },
  collapseIconContainer: {
    width: '24px',
    marginLeft: theme.spacing(-1),
    paddingTop: '3px',
    alignSelf: 'flex-start',
  },
  collapseIcon: {
    cursor: 'pointer',
    '&:hover': {
      background: 'none',
    },
  },
  title: {
    cursor: 'pointer',
    userSelect: 'none',
  },
  subtitle: {
    marginTop: '-4px',
    paddingTop: theme.spacing(1),

    lineHeight: '24px',
  },

  buttonsContainer: {
    paddingLeft: theme.spacing(1),
  },
}));

function Menu() {
  const classes = useStyles();
  const menuId = useSelector((state) => state.menus.views.itemId);
  const menu = useSelector((state) => state.menus.menus.byId[menuId]);

  const [show, setShow] = useState(true);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  function handleAddCategories(event) {
    setAddCategoryOpen(true);
  }
  function handleUpdateMenu(event) {
    setMenuModalOpen(true);
  }

  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <Paper elevation={3}>
      {menuId ? (
        <React.Fragment>
          <Box className={classes.headerContainer} display="flex">
            <Box className={classes.collapseIconContainer} onClick={handleClickCollapse}>
              <IconButton className={classes.collapseIcon} disableRipple aria-label="edit" size="small">
                {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
              </IconButton>
            </Box>
            <Box>
              <Grid container alignItems="center">
                <TruncatedBox
                  className={classes.title}
                  fontSize="subtitle1.fontSize"
                  fontWeight="fontWeightBold"
                  onClick={handleClickCollapse}
                >
                  {menu.name}
                </TruncatedBox>
                <Grid className={classes.buttonsContainer} item>
                  <IconButton aria-label="edit" size="small" onClick={handleUpdateMenu}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item className={classes.buttonsContainer}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    endIcon={<Add />}
                    onClick={handleAddCategories}
                  >
                    Kategorien
                  </Button>
                </Grid>
              </Grid>
              <TruncatedBox
                className={classes.subtitle}
                color="text.secondary"
                fontSize="subtitle2.fontSize"
                fontStyle="italic"
              >
                {menu.desc}
              </TruncatedBox>
            </Box>
          </Box>

          <Collapse in={show}>
            <MenuCategories menu={menu} />
          </Collapse>

          <AddCategoryModal open={addCategoryOpen} setOpen={setAddCategoryOpen} menu={menu} />
          <MenuModal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} menu={menu} />
        </React.Fragment>
      ) : null}
    </Paper>
  );
}

export default Menu;
