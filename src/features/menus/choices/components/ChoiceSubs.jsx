import React from 'react';

import { Box, Divider } from '@material-ui/core';
import Sub from '../../subs/components/Sub';

function ChoiceSubs({ choice }) {
  const subIds = choice.subs;
  return subIds.length > 0 ? (
    <React.Fragment>
      {subIds.map((subId, index) => (
        <React.Fragment key={subId}>
          <Sub subId={subId} choice={choice} />
          {index < subIds.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </React.Fragment>
  ) : (
    <Box color="text.secondary" fontStyle="italic" p={2}>
      Keine Option verfügbar. Bitte fügen Sie eine Option hinzu...
    </Box>
  );
}

export default ChoiceSubs;
