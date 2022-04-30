import React from 'react';

import { Box, Grid, Paper } from '@mui/material';
import Choice from '../../choices/components/Choice';

function ProductChoices({ product }) {
  const choiceIds = product.choices;
  return choiceIds.length > 0 ? (
    <Grid container spacing={2}>
      {choiceIds.map((choiceId, index) => (
        <Grid item xs={6} key={choiceId}>
          <Paper
            sx={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'grey.300', borderRadius: '0 0 16px 16px' }}
            square
          >
            <Choice choiceId={choiceId} product={product} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box color="text.secondary" fontStyle="italic">
      Dieses Angebot hat noch keine Optiongruppen...
    </Box>
  );
}

export default ProductChoices;
