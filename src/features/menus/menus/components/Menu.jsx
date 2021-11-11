import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveMenu } from '../slice';

import { Box, Button, Grid, Paper, IconButton, Collapse } from '@mui/material';
import MenuCategories from 'features/menus/menus/components/MenuCategories';
import SetCategoriesModal from 'features/menus/menus/components/SetCategoriesModal/SetCategoriesModal';

import MenuModal from './MenuModal';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import { Add, Edit, Remove } from '@mui/icons-material';

function Menu() {
  const menuId = useSelector((state) => state.menus.views.itemId);
  const menu = useSelector((state) => state.menus.menus.byId[menuId]);
  const activeMenu = useSelector(selectActiveMenu);

  const [show, setShow] = useState(true);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [setCategoriesOpen, setSetCategoriesOpen] = useState(false);

  function handleEditMenu(event) {
    setMenuModalOpen(true);
  }

  function handleSetCategories(event) {
    setSetCategoriesOpen(true);
  }

  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <Paper>
      {menuId ? (
        <React.Fragment>
          <Box
            sx={{
              display: 'flex',
              p: 2,

              borderBottom: (theme) => '1px solid ' + theme.palette.grey[300],
            }}
          >
            <Box sx={{ width: '24px', ml: -1, alignSelf: 'flex-start' }} onClick={handleClickCollapse}>
              <IconButton
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'none',
                  },
                }}
                disableRipple
                aria-label="edit"
                size="small"
              >
                {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
              </IconButton>
            </Box>
            <Box flexGrow={1}>
              <Grid container alignItems="center">
                <TruncatedBox
                  sx={{ cursor: 'pointer', userSelect: 'none' }}
                  fontSize="subtitle1.fontSize"
                  fontWeight="fontWeightBold"
                  onClick={handleClickCollapse}
                >
                  {menu.name}
                </TruncatedBox>
                <Grid item sx={{ pl: 1 }}>
                  <IconButton aria-label="edit" size="small" onClick={handleEditMenu}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item sx={{ pl: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    endIcon={<Add />}
                    onClick={handleSetCategories}
                  >
                    Kategorie
                  </Button>
                </Grid>

                <Box
                  sx={{
                    pl: 1,
                    color: activeMenu?.id === menu.id ? 'success.main' : 'grey.500',
                    fontStyle: 'italic',
                    flexGrow: 1,
                    textAlign: 'right',
                  }}
                >
                  {activeMenu?.id === menu.id ? 'aktiv' : 'inaktiv'}
                </Box>
              </Grid>
              <TruncatedBox
                sx={{
                  mt: '-4px',
                  pt: 1,

                  color: 'text.secondary',
                  fontSize: 'subtitle2.fontSize',
                  fontStyle: 'italic',
                  lineHeight: '24px',
                }}
              >
                {menu.desc}
              </TruncatedBox>
            </Box>
          </Box>

          <Collapse in={show}>
            <MenuCategories menu={menu} />
          </Collapse>

          <SetCategoriesModal open={setCategoriesOpen} setOpen={setSetCategoriesOpen} menu={menu} />
          <MenuModal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} menu={menu} />
        </React.Fragment>
      ) : null}
    </Paper>
  );
}

export default Menu;
