import { useEffect } from 'react';
import { setChanged } from 'features/mode/actions';

import { useDispatch } from 'react-redux';

export default function useDetectFormChange({ isDirty }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setChanged(isDirty));
  }, [isDirty, dispatch]);
}
