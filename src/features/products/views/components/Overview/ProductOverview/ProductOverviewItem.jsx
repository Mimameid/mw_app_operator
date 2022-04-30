import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/products/views/slice';
import { setAvailable } from 'features/products/products/actions';

import { Grid, IconButton, ListItem, Switch, Box } from '@mui/material';
import GridItem from 'common/components/dataDisplay/GridItem';
import EditProduct from 'features/products/products/components/EditProduct';
import { DeleteForever, Edit } from '@mui/icons-material';

function ProductOverviewItem({ product, setTriggerDelete, selected }) {
  const dispatch = useDispatch();

  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleEditProduct(event) {
    setEditModalOpen(true);
  }

  function handleSelectProduct(event) {
    dispatch(selectItem(product.id));
  }

  function handleDisableProduct(event) {
    dispatch(setAvailable({ productId: product.id, isAvailable: event.target.checked }));
  }

  return (
    <React.Fragment>
      <ListItem
        sx={{ px: 2, py: 1, bgcolor: (theme) => (selected ? theme.palette.primary.light + '33' : null) }}
        button={!selected}
        onClick={!selected ? handleSelectProduct : null}
      >
        <Grid container>
          <GridItem item xs={1}>
            {product.id}
          </GridItem>
          <GridItem item xs={2}>
            {product.name}
          </GridItem>
          <GridItem item xs={2}>
            {product.desc}
          </GridItem>
          <GridItem item xs={2}>
            {product.choices.length}
          </GridItem>
          <GridItem item xs={2}>
            {new Date(product.created).toLocaleDateString('DE-de')}
          </GridItem>
          <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={1}>
            <Switch
              checked={product.isAvailable}
              onChange={handleDisableProduct}
              color="primary"
              size="small"
              inputProps={{ 'aria-label': 'product available checkbox' }}
            />
          </Grid>
          <Box
            sx={{ visibility: selected ? 'visible' : 'hidden' }}
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
          >
            <IconButton aria-label="edit" size="small" onClick={handleEditProduct}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={() => setTriggerDelete(true)}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>

      <EditProduct open={editModalOpen} onClose={() => setEditModalOpen(false)} product={product} />
    </React.Fragment>
  );
}

export default React.memo(ProductOverviewItem);
