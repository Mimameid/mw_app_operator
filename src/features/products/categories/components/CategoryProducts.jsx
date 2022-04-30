import React from 'react';

import { Paper, Box, Divider } from '@mui/material';
import Product from '../../products/components/Product';

function CategoryProducts({ category }) {
  const productIds = category.products;
  return productIds.length > 0 ? (
    <Paper sx={{ p: 0 }} variant="outlined" square>
      {productIds.map((productId, index) => (
        <React.Fragment key={productId}>
          <Product productId={productId} category={category} />
          {index < productIds.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </Paper>
  ) : (
    <Box color="text.secondary" fontStyle="italic">
      Diese Kategorie hat noch keine Angebote. Bitte fügen Sie ein Angebot hinzu...
    </Box>
  );
}

export default CategoryProducts;
