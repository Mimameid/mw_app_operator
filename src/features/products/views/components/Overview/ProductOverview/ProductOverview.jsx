import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Divider, Grid, List, ListSubheader } from '@mui/material';
import ProductOverviewItem from './ProductOverviewItem';
import DeleteProduct from 'features/products/products/components/DeleteProduct';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';

function ProductOverview() {
  const productsArray = useSelector((state) => {
    let productsArray = Object.values(state.menus.products.byId);
    productsArray.sort((a, b) => a.name.localeCompare(b.name));
    return productsArray;
  });
  const selectedProductId = useSelector((state) => state.menus.views.itemId);
  const [triggerDelete, setTriggerDelete] = useState(false);

  return (
    <List sx={{ p: 0 }}>
      <ListSubheader
        sx={{
          color: 'common.white',
          bgcolor: 'primary.main',

          borderBottom: (theme) => '1px solid ' + theme.palette.primary.main,
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        <Grid container>
          <GridHeaderItem item xs={1}>
            ID
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Name
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Beschreibung
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            OG
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Erstellt
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Verfügbar
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '234px' }}>
        {productsArray.length === 0 ? (
          <EmptyView>Keine Angebote verfügbar. Bitte erstellen Sie ein Angebot...</EmptyView>
        ) : (
          productsArray.map((product, index) => (
            <React.Fragment key={product.id}>
              <ProductOverviewItem
                product={product}
                setTriggerDelete={setTriggerDelete}
                selected={product.id === selectedProductId}
              />
              {productsArray.length >= 5 && index === productsArray.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        )}
      </Box>
      <DeleteProduct trigger={triggerDelete} setTrigger={setTriggerDelete} productId={selectedProductId} />
    </List>
  );
}

export default ProductOverview;
