import { React, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedChoices, removeSub } from 'features/menus/choices/choicesSlice';

import { Box, Grid, IconButton, makeStyles } from '@material-ui/core';
import { Check, Delete, Edit } from '@material-ui/icons';
import EditSubModal from './EditSubModal';
import WarningDialog from 'common/components/other/WarningDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    verticalAlign: 'middle',
    minWidth: '30px',
  },
}));

function Sub({ subId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sub = useSelector((state) => state.menus.subs.byId[subId]);
  const selectAffectedChoices = useMemo(makeSelectAffectedChoices, []);
  const affectedChoices = useSelector((state) => selectAffectedChoices(state, sub.id));

  const [editSubOpen, setEditSubOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  function handleEditSub() {
    if (affectedChoices.length > 0) {
      setEditDialogOpen(true);
      return;
    }
    setEditSubOpen(true);
  }

  const handleRejectDialog = (event) => {
    setEditDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setEditDialogOpen(false);
    setEditSubOpen(true);
  };

  const handleRemoveSub = (event) => {
    dispatch(removeSub(subId));
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Box className={classes.root} display="inline-block">
          {sub.isSelected ? <Check color="primary" /> : null}
        </Box>
        <Box display="inline-block"> {sub.name} </Box>
        <IconButton aria-label="edit dish" size="small" onClick={handleEditSub}>
          <Edit fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete dish" size="small" onClick={handleRemoveSub}>
          <Delete fontSize="small" />
        </IconButton>
      </Grid>

      <Grid item style={{ marginLeft: 'auto' }}>
        {parseFloat(sub.price.replace(',', '.')) > 0 ? sub.price + '€' : '-'}
      </Grid>
      <WarningDialog
        open={editDialogOpen}
        title="Option bearbeiten?"
        message={
          'Das Bearbeiten der Option ändert die Option in sämtlichen Extras und sämtlichen Menüs in denen das Extra vorkommt. Betroffene Extras: ' +
          affectedChoices.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
      <EditSubModal open={editSubOpen} setOpen={setEditSubOpen} sub={sub} />
    </Grid>
  );
}

export default Sub;
