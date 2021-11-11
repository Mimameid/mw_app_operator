import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSub } from 'features/menus/choices/actions';

import { Box, Grid, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import EditSub from './EditSub';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';

function Sub({ subId, choice }) {
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
    <Grid sx={{ p: choice ? 1 : 2 }} container alignItems="center">
      <Grid item>
        <TruncatedBox sx={{ verticalAlign: 'middle' }} display="inline-block">
          {sub.name}
        </TruncatedBox>
        <Box sx={{ pl: 1 }} display="inline-block">
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
          {sub.price.toFixed(2)}€
        </Box>
      </Grid>
      <EditSub open={editSubOpen} onClose={() => setEditSubOpen(false)} sub={sub} />
    </Grid>
  );
}

export default Sub;
