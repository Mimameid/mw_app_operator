import React from 'react';

import { Box, Grid, Paper } from '@mui/material';
import Choice from '../../choices/components/Choice';

function DishChoices({ dish }) {
  const choiceIds = dish.choices;
  return choiceIds.length > 0 ? (
    <Grid container spacing={2}>
      {choiceIds.map((choiceId, index) => (
        <Grid item xs={6} key={choiceId}>
          <Paper
            sx={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'grey.300', borderRadius: '0 0 16px 16px' }}
            square
          >
            <Choice choiceId={choiceId} dish={dish} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box color="text.secondary" fontStyle="italic">
      Diese Speise hat noch keine Optiongruppen...
    </Box>
  );
}

export default DishChoices;
