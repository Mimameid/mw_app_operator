import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveOffer } from 'features/offers/offers/slice';
import { selectItem } from '../../slice';

import Offer from 'features/offers/offers/components/Offer';
import EmptyView from './EmptyView';

function OfferView() {
  const dispatch = useDispatch();
  const selectedOfferId = useSelector((state) => state.offers.views.itemId);
  const activeOffer = useSelector(selectActiveOffer);

  useEffect(() => {
    if (activeOffer) {
      dispatch(selectItem(activeOffer.id));
    }
  }, [dispatch, activeOffer]);

  return selectedOfferId ? (
    <React.Fragment>
      <Offer />
    </React.Fragment>
  ) : (
    <EmptyView>Wählen Sie ein Speisekarte aus der Liste aus, um sie anzuzeigen...</EmptyView>
  );
}

export default OfferView;
