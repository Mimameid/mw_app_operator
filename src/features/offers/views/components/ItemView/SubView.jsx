import React from 'react';
import { useSelector } from 'react-redux';

import Sub from 'features/offers/subs/components/Sub';
import EmptyView from './EmptyView';

function SubView() {
  const activeSubId = useSelector((state) => state.offers.views.itemId);

  return activeSubId ? (
    <React.Fragment>
      <Sub subId={activeSubId} />
    </React.Fragment>
  ) : (
    <EmptyView>Wählen Sie eine Option aus der Liste aus, um sie anzuzeigen...</EmptyView>
  );
}

export default SubView;
