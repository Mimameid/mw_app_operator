import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/userState/action';

export function useAuthenticate() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
}
