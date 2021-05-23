import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/userState/authState/action';

export function useAuthenticate() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
}
