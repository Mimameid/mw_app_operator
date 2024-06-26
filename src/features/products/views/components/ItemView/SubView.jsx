import React from 'react';
import { useSelector } from 'react-redux';

import Sub from 'features/products/subs/components/Sub';
import EmptyView from './EmptyView';

function SubView() {
  const activeSubId = useSelector((state) => state.menus.views.itemId);

  return activeSubId ? (
    <React.Fragment>
      <Sub subId={activeSubId} />
    </React.Fragment>
  ) : (
    <EmptyView>Wählen Sie eine Option aus der Liste aus, um sie anzuzeigen...</EmptyView>
  );
}

export default SubView;
