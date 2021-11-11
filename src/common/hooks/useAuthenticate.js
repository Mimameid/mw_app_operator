import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState } from 'features/user';
import { authenticate } from 'features/user/actions';
import { fetchShop } from 'features/shop/shop/actions';

export function useAuthenticate() {
  const dispatch = useDispatch();
  const [authenticating, setAuthenticating] = useState(true);
  const [loadingShop, setLoadingShop] = useState(true);
  const { loggedIn, authenticated, shopRegistered } = useSelector(selectUserState);

  useEffect(() => {
    if (!authenticated) {
      setAuthenticating(true);
      setLoadingShop(true);

      dispatch(authenticate()).then((data) => {
        if (data.error) {
          setAuthenticating(false);
          return;
        }

        dispatch(fetchShop()).then((data) => {
          setAuthenticating(false);
          setLoadingShop(false);
        });
      });
    }
  }, [dispatch, loggedIn, authenticated, shopRegistered]);
  return { loggedIn, shopRegistered, authenticating, loadingShop };
}
