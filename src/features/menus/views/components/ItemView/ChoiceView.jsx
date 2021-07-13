import React from 'react';
import { useSelector } from 'react-redux';

import { Paper } from '@material-ui/core';
import Choice from 'features/menus/choices/components/Choice';
import EmptyView from './EmptyView';

function ChoiceView() {
  const activeChoiceId = useSelector((state) => state.menus.views.itemId);

  return (
    <Paper variant="outlined">
      {activeChoiceId ? (
        <React.Fragment>
          <Choice choiceId={activeChoiceId} />
        </React.Fragment>
      ) : (
        <EmptyView message="Wählen sie eine Auswahlgruppe aus der Liste aus, um sie anzuzeigen..." />
      )}
    </Paper>
  );
}

export default ChoiceView;
