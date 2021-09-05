import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
    }
  };

  const handleRejectDialog = (event) => {
    setTransitionDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
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
