import React from 'react';
import { useSelector } from 'react-redux';

import Product from 'features/products/products/components/Product';
import EmptyView from './EmptyView';

function ProductView() {
  const activeProductId = useSelector((state) => state.menus.views.itemId);

  return activeProductId ? (
    <React.Fragment>
      <Product productId={activeProductId} />
    </React.Fragment>
  ) : (
    <EmptyView>Wählen Sie ein Angebot aus der Liste aus, um es anzuzeigen...</EmptyView>
  );
}

export default ProductView;
