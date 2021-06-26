import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from 'store/userState/auth/actions';

export function useAuthenticate() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
}
