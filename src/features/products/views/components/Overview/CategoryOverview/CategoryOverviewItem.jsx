import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/products/views/slice';

import { Box, Grid, IconButton, ListItem } from '@mui/material';
import GridItem from 'common/components/dataDisplay/GridItem';
import EditCategory from 'features/products/categories/components/EditCategory';
import { DeleteForever, Edit } from '@mui/icons-material';

function CategoryOverviewItem({ category, setTriggerDelete, selected }) {
  const dispatch = useDispatch();

  const [editCategoryOpen, setEditCategoryOpen] = useState(false);

  function handleEditCategory(event) {
    setEditCategoryOpen(true);
  }

  function handleSelectCategory(event) {
    dispatch(selectItem(category.id));
  }

  return (
    <React.Fragment>
      <ListItem
        sx={{ px: 2, py: 1, bgcolor: (theme) => (selected ? theme.palette.primary.light + '33' : null) }}
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
            {category.products.length}
          </GridItem>
          <GridItem item xs={2}>
            {new Date(category.created).toLocaleDateString('DE-de')}
          </GridItem>
          <Box
            sx={{ visibility: selected ? 'visible' : 'hidden' }}
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
          >
            <IconButton aria-label="edit" size="small" onClick={handleEditCategory}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={() => setTriggerDelete(true)}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>

      <EditCategory open={editCategoryOpen} onClose={() => setEditCategoryOpen(false)} category={category} />
    </React.Fragment>
  );
}

export default React.memo(CategoryOverviewItem);
