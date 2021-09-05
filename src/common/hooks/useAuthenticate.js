import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from 'features/user/actions';
import { hasShop } from 'features/shop/shop/actions';

export function useAuthenticate() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { loggedIn, shopRegistered } = useSelector((state) => ({
    loggedIn: state.user.loggedIn,
    shopRegistered: state.user.shopRegistered,
  }));

  useEffect(() => {
    dispatch(authenticate()).then((data) => {
      if (data.error) {
        setLoading(false);
        return;
      }

      dispatch(hasShop()).then((data) => {
        setLoading(false);
      });
    });
  }, [dispatch]);
  return { loggedIn, shopRegistered, loading };
}
