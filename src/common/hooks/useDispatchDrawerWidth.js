import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { setWidth } from 'features/drawer/drawerSlice';

function useDispatchDrawerWidth() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(setWidth(open ? 200 : theme.spacing(7) + 1));
  }, [open, dispatch, theme]);

  return [open, setOpen];
}

export default useDispatchDrawerWidth;
