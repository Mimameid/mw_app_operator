import React from 'react';

import { Paper, Box, Divider } from '@mui/material';
import Dish from '../../dishes/components/Dish';

function CategoryDishes({ category }) {
  const dishIds = category.dishes;
  return dishIds.length > 0 ? (
    <Paper sx={{ p: 0 }} variant="outlined" square>
      {dishIds.map((dishId, index) => (
        <React.Fragment key={dishId}>
          <Dish dishId={dishId} category={category} />
          {index < dishIds.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </Paper>
  ) : (
    <Box color="text.secondary" fontStyle="italic">
      Diese Kategorie hat noch keine Speisen. Bitte fügen Sie eine Speise hinzu...
    </Box>
  );
}

export default CategoryDishes;
