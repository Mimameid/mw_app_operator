import React, { useState } from 'react';

import { Link, useLocation, useHistory } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CustomDialog from '../../common/CustomDialog/CustomDialog';

const useStyles = makeStyles((theme) => ({
  navLink: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '& :hover': {
      textDecoration: 'underline',
      textDecorationColor: theme.palette.primary.main,
    },
  },
  navLinkSelected: {
    textDecoration: 'underline',
    textDecorationColor: theme.palette.primary.main,
  },
  selectedIcon: {
    color: theme.palette.primary.main,
  },
}));

function NavigationLink({
  name,
  exact,
  path,
  component,
  IconComponent,
  changed,
  draw,
  toggleDraw,
  deactivateArea,
  resetChanged,
}) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [transitionDialogOpen, setTransitionDialogOpen] = useState(false);
  const routeTransitionHandler = (event) => {
    if (changed) {
      event.preventDefault();
      setTransitionDialogOpen(true);
    }
  };

  const handleRejectDialog = (event) => {
    setTransitionDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    if (draw) {
      toggleDraw();
    }
    deactivateArea();
    resetChanged();

    setTransitionDialogOpen(false);
    history.push(path);
  };

  const selected = location.pathname === path;
  return (
    <React.Fragment>
      <Link
        className={`${classes.navLink} ${selected ? classes.navLinkSelected : null}`}
        to={path}
        onClick={routeTransitionHandler}
      >
        <ListItem button>
          <ListItemIcon>
            <IconComponent className={selected ? classes.selectedIcon : ''} />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      </Link>
      <CustomDialog
        open={transitionDialogOpen}
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        title="Bearbeitung abbrechen?"
        message="Wenn Sie die Bearbeitung abbrechen, werden alle Veränderungen
      unwiederruflich gelöscht."
      />
    </React.Fragment>
  );
}

export default NavigationLink;
