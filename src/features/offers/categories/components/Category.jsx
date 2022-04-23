import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory } from 'features/offers/offers/actions';

import { Box, Grid, Button, Paper, IconButton, Collapse } from '@mui/material';
import CategoryDishes from 'features/offers/categories/components/CategoryDishes';
import EditCategory from './EditCategory';
import SetDishesModal from 'features/offers/categories/components/SetDishesModal/SetDishesModal';
import TruncatedBox from 'features/offers/common/components/TruncatedBox';

import { Add, Delete, Edit, Remove } from '@mui/icons-material';

function Category({ categoryId, offer }) {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.offers.categories.byId[categoryId]);

  const [show, setShow] = useState(true);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [setDishesOpen, setSetDishesOpen] = useState(false);

  function handleEditCategory() {
    setEditCategoryOpen(true);
  }

  function handleRemoveCategory(event) {
    dispatch(removeCategory({ categoryId, offerId: offer.id }));
  }

  function handleSetDishes() {
    setSetDishesOpen(true);
  }

  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <Paper elevation={0}>
      <Box
        sx={{
          p: 2,
          color: 'common.white',
          bgcolor: 'primary.main',
          borderBottom: (theme) => '1px solid ' + theme.palette.primary.main,
        }}
        display="flex"
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
            color="inherit"
            size="small"
          >
            {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
          </IconButton>
        </Box>
        <Box>
          <Grid container alignItems="center">
            <TruncatedBox
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
              }}
              fontSize="subtitle1.fontSize"
              fontWeight="fontWeightBold"
              onClick={handleClickCollapse}
            >
              {category.name}
            </TruncatedBox>
            <Grid sx={{ pl: 1 }} item>
              <IconButton aria-label="edit" color="inherit" size="small" onClick={handleEditCategory}>
                <Edit fontSize="small" />
              </IconButton>
              {offer ? (
                <IconButton aria-label="edit" color="inherit" size="small" onClick={handleRemoveCategory}>
                  <Delete fontSize="small" />
                </IconButton>
              ) : null}
            </Grid>
            <Grid item sx={{ pl: 1 }}>
              <Button size="small" variant="outlined" color="inherit" endIcon={<Add />} onClick={handleSetDishes}>
                Speise
              </Button>
            </Grid>
          </Grid>
          <TruncatedBox
            sx={{
              mt: '-4px',
              pt: 1,

              lineHeight: '24px',
            }}
            fontSize="subtitle2.fontSize"
            fontStyle="italic"
          >
            {category.desc}
          </TruncatedBox>
        </Box>
      </Box>

      <Collapse in={show}>
        <Box sx={{ p: 2 }}>
          <CategoryDishes category={category} />
        </Box>
      </Collapse>

      <EditCategory open={editCategoryOpen} onClose={() => setEditCategoryOpen(false)} category={category} />
      <SetDishesModal open={setDishesOpen} setOpen={setSetDishesOpen} category={category} />
    </Paper>
  );
}

export default Category;
