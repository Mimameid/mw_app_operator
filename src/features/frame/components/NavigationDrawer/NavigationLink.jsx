import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDrawerOpen } from '../../actions';
import { reset } from 'features/mode/actions';

import { Link, useLocation, useHistory } from 'react-router-dom';

import { Box, Button, Fade, ListItem, useMediaQuery, useTheme } from '@mui/material';
import CustomDialog from 'common/components/feedback/CustomDialog';

function NavigationLink({ name, path, IconComponent }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  const { changed, open } = useSelector((state) => ({
    changed: state.mode.changed || state.mode.draw,
    open: state.frame.drawerOpen,
  }));

  const location = useLocation();
  const history = useHistory();

  const [transitionDialogOpen, setTransitionDialogOpen] = useState(false);

  const routeTransitionHandler = (event) => {
    if (changed && path !== history.location.pathname) {
      event.preventDefault();
      setTransitionDialogOpen(true);
    } else if (match) {
      dispatch(setDrawerOpen(false));
    }
  };

  const handleRejectDialog = (event) => {
    setTransitionDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setTransitionDialogOpen(false);
    dispatch(reset());
    if (match) {
      dispatch(setDrawerOpen(false));
    }

    history.push(path);
  };

  const selected = location.pathname === path;
  return (
    <React.Fragment>
      <ListItem sx={{ p: 0, pb: 0.5 }}>
        <Button
          sx={{
            minWidth: '24px',
            height: '42px',

            justifyContent: 'flex-start',
            textTransform: 'none',
            '&:hover': {
              bgcolor: (theme) => theme.palette.primary.light + '28',
            },
          }}
          component={Link}
          startIcon={
            <IconComponent
              sx={{
                ml: 0.8,
              }}
              color={selected ? 'primary' : 'action'}
            />
          }
          size="large"
          to={path}
          onClick={routeTransitionHandler}
          fullWidth
        >
          <Fade in={open}>
            <Box sx={{ color: selected ? 'primary.main' : 'text.secondary' }}>{name}</Box>
          </Fade>
        </Button>
        <CustomDialog
          open={transitionDialogOpen}
          handleReject={handleRejectDialog}
          handleAccept={handleAcceptDialog}
          title="Bearbeitung abbrechen?"
          message="Wenn Sie die Bearbeitung abbrechen, werden alle Veränderungen
          unwiederruflich gelöscht."
        />
      </ListItem>
    </React.Fragment>
  );
}

export default NavigationLink;
