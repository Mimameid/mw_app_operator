import React from 'react';
import { useSelector } from 'react-redux';

import { Paper } from '@material-ui/core';
import Sub from 'features/menus/subs/components/Sub';
import EmptyView from './EmptyView';

function SubView() {
  const activeSubId = useSelector((state) => state.menus.views.itemId);

  return (
    <Paper variant="outlined">
      {activeSubId ? (
        <React.Fragment>
          <Sub subId={activeSubId} />
        </React.Fragment>
      ) : (
        <EmptyView message="Wählen Sie eine Option aus der Liste aus, um sie anzuzeigen..." />
      )}
    </Paper>
  );
}

export default SubView;
