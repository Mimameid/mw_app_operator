import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { fetchDeliveryAreas } from '../store/userState/deliveryAreas/actions';

export function useFetchDeliveryAreas() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeliveryAreas());
  }, [dispatch]);
}
