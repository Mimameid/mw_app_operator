import React from 'react';
import { useSelector } from 'react-redux';

import Choice from 'features/offers/choices/components/Choice';
import EmptyView from './EmptyView';

function ChoiceView() {
  const activeChoiceId = useSelector((state) => state.offers.views.itemId);

  return activeChoiceId ? (
    <React.Fragment>
      <Choice choiceId={activeChoiceId} />
    </React.Fragment>
  ) : (
    <EmptyView>Wählen Sie eine Optiongruppe aus der Liste aus, um sie anzuzeigen...</EmptyView>
  );
}

export default ChoiceView;
