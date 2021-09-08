import { useEffect } from 'react';
import { reset, setChanged } from 'features/mode/actions';

import { useDispatch } from 'react-redux';

export default function useDetectFormChange(formState) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (formState.isDirty) {
      dispatch(setChanged(true));
    }
  }, [formState.isDirty, dispatch]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      dispatch(reset());
    }
  }, [formState.isSubmitSuccessful, dispatch]);
}
