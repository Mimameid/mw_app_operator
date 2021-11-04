import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/menus/views/slice';

import { Box, Grid, IconButton, ListItem } from '@mui/material';
import GridItem from 'common/components/dataDisplay/GridItem';
import EditCategory from 'features/menus/categories/components/EditCategory';
import DeleteCategory from 'features/menus/categories/components/DeleteCategory';
import { DeleteForever, Edit } from '@mui/icons-material';

function CategoryOverviewItem({ category, selected }) {
  const dispatch = useDispatch();

  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  function handleEditCategory(event) {
    setEditCategoryOpen(true);
  }

  function handleSelectCategory(event) {
    dispatch(selectItem(category.id));
  }

  function handleDeleteCategory(event) {
    setTriggerDelete(true);
  }

  return (
    <React.Fragment>
      <ListItem
        sx={{
          bgcolor: selected ? (theme) => theme.palette.primary.light + '33' : null,
        }}
        button={!selected}
        onClick={!selected ? handleSelectCategory : null}
      >
        <Grid container>
          <GridItem item xs={1}>
            {category.id}
          </GridItem>
          <GridItem item xs={2}>
            {category.name}
          </GridItem>
          <GridItem item xs={2}>
            {category.desc}
          </GridItem>
          <GridItem item xs={2}>
            {category.dishes.length}
          </GridItem>
          <GridItem item xs={2}>
            {new Date(category.created).toLocaleDateString('DE-de')}
          </GridItem>
          <Box
            sx={{
              visibility: selected ? 'visible' : 'hidden',
            }}
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
          >
            <IconButton aria-label="edit" size="small" onClick={handleEditCategory}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={handleDeleteCategory}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>
      <EditCategory open={editCategoryOpen} setOpen={setEditCategoryOpen} category={category} />
      <DeleteCategory trigger={triggerDelete} setTrigger={setTriggerDelete} categoryId={category.id} />
    </React.Fragment>
  );
}

export default CategoryOverviewItem;
