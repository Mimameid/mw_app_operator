import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { fetchDeliveryArea } from '../store/userState/deliveryAreaState/action';

export function useFetchDeliveryArea() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeliveryArea());
  });
}
