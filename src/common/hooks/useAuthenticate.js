import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from 'features/user/auth/authSlice';

export function useAuthenticate() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
}
