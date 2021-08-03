import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDraw, resetChanged } from 'features/deliveryAreas/slices/mode/actions';
import { deactivateArea } from 'features/deliveryAreas/slices/areaData/actions';

import { Link, useLocation, useHistory } from 'react-router-dom';

import { Box, Button, ListItem, makeStyles } from '@material-ui/core';
import CustomDialog from 'common/components/dialogs/CustomDialog';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 0,
  },
  button: {
    padding: '12px 16px 12px 14px',

    maxHeight: '46px',
    minWidth: '24px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.light + '28',
    },
  },
  selectedIcon: {
    color: theme.palette.primary.main,
  },
}));

function NavigationLink({ name, path, IconComponent }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { draw, changed, open } = useSelector((state) => ({
    draw: state.deliveryAreas.mode.draw,
    changed: state.deliveryAreas.mode.changed,
    open: state.frame.drawerOpen,
  }));
  const location = useLocation();
  const history = useHistory();

  const [transitionDialogOpen, setTransitionDialogOpen] = useState(false);

  const routeTransitionHandler = (event) => {
    if (changed || draw) {
      event.preventDefault();
      setTransitionDialogOpen(true);
    }
  };

  const handleRejectDialog = (event) => {
    setTransitionDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    if (draw) {
      dispatch(toggleDraw());
    }
    dispatch(deactivateArea());
    dispatch(resetChanged());

    setTransitionDialogOpen(false);
    history.push(path);
  };

  const selected = location.pathname === path;
  return (
    <React.Fragment>
      <ListItem className={classes.listItem}>
        <Button
          component={Link}
          className={classes.button}
          startIcon={<IconComponent color={selected ? 'primary' : 'action'} />}
          size="large"
          to={path}
          onClick={routeTransitionHandler}
          fullWidth
        >
          <Box color={selected ? 'primary.main' : 'text.secondary'}>{open ? name : ' '}</Box>
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
