import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';

function useDrawerWidth() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_WIDTH', payload: open ? 200 : theme.spacing(7) + 1 });
  }, [open, dispatch, theme]);

  return [open, setOpen];
}

export default useDrawerWidth;
