import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSub } from 'features/menus/choices/actions';

import { Box, Grid, IconButton, makeStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import EditSub from './EditSub';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';

const useStyles = makeStyles((theme) => ({
  smallPadding: {
    padding: theme.spacing(1),
  },
  mediumPadding: {
    padding: theme.spacing(2),
  },
  buttonsContainer: {
    paddingLeft: theme.spacing(1),
  },
  subName: {
    verticalAlign: 'middle',
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
    <Grid className={choice ? classes.smallPadding : classes.mediumPadding} container alignItems="center">
      <Grid item>
        <TruncatedBox className={classes.subName} display="inline-block">
          {sub.name}
        </TruncatedBox>
        <Box className={classes.buttonsContainer} display="inline-block">
          <IconButton aria-label="edit dish" size="small" onClick={handleEditSub}>
            <Edit fontSize="small" />
          </IconButton>
          {choice ? (
            <IconButton aria-label="delete dish" size="small" onClick={handleRemoveSub}>
              <Delete fontSize="small" />
            </IconButton>
          ) : null}
        </Box>
      </Grid>

      <Grid item style={{ marginLeft: 'auto' }}>
        <Box color="primary.main" fontWeight="fontWeightBold">
          {sub.price}€
        </Box>
      </Grid>
      <EditSub open={editSubOpen} setOpen={setEditSubOpen} sub={sub} />
    </Grid>
  );
}

export default Sub;
