import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSub } from 'features/menus/choices/choicesSlice';

import { Box, Grid, IconButton, makeStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import EditSub from './EditSub';

const useStyles = makeStyles((theme) => ({
  subContainer: {
    padding: theme.spacing(1),
  },
  root: {
    verticalAlign: 'middle',
    minWidth: '24px',
  },
}));

function Sub({ subId, choice }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sub = useSelector((state) => state.menus.subs.byId[subId]);

  const [editSubOpen, setEditSubOpen] = useState(false);

  function handleEditSub() {
    setEditSubOpen(true);
  }

  const handleRemoveSub = (event) => {
    dispatch(removeSub({ subId, choiceId: choice.id }));
  };

  return (
    <Grid className={choice ? null : classes.subContainer} container alignItems="center">
      <Grid item>
        <Box display="inline-block"> {sub.name} </Box>
        <IconButton aria-label="edit dish" size="small" onClick={handleEditSub}>
          <Edit fontSize="small" />
        </IconButton>
        {choice ? (
          <IconButton aria-label="delete dish" size="small" onClick={handleRemoveSub}>
            <Delete fontSize="small" />
          </IconButton>
        ) : null}
      </Grid>

      <Grid item style={{ marginLeft: 'auto' }}>
        {parseFloat(sub.price.replace(',', '.')) > 0 ? sub.price + '€' : '-'}
      </Grid>
      <EditSub open={editSubOpen} setOpen={setEditSubOpen} sub={sub} />
    </Grid>
  );
}

export default Sub;
