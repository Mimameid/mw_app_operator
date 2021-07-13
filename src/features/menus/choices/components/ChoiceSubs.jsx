import React from 'react';

import { Divider } from '@material-ui/core';
import Sub from '../../subs/components/Sub';

function ChoiceSubs({ choice }) {
  const subIds = choice.subs;
  return subIds.length > 0 ? (
    <React.Fragment>
      {subIds.map((subId, index) => (
        <React.Fragment key={subId}>
          <Sub subId={subId} choice={choice} />
          <Divider />
        </React.Fragment>
      ))}
    </React.Fragment>
  ) : null;
}

export default ChoiceSubs;
