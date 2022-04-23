import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/offers/views/slice';

import { Box, Grid, IconButton, ListItem } from '@mui/material';
import EditSub from 'features/offers/subs/components/EditSub';
import GridItem from 'common/components/dataDisplay/GridItem';
import { DeleteForever, Edit } from '@mui/icons-material';

function SubOverviewItem({ sub, setTriggerDelete, selected }) {
  const dispatch = useDispatch();

  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleEditDish(event) {
    setEditModalOpen(true);
  }

  function handleSelectCategory(event) {
    dispatch(selectItem(sub.id));
  }

  return (
    <React.Fragment>
      <ListItem
        sx={{ px: 2, py: 1, bgcolor: (theme) => (selected ? theme.palette.primary.light + '33' : null) }}
        button={!selected}
        onClick={!selected ? handleSelectCategory : null}
      >
        <Grid container>
          <GridItem item xs={3}>
            {sub.id}
          </GridItem>
          <GridItem item xs={3}>
            {sub.name}
          </GridItem>
          <GridItem item xs={3}>
            {new Date(sub.created).toLocaleDateString('DE-de')}
          </GridItem>
          <Box
            sx={{ visibility: selected ? 'visible' : 'hidden' }}
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
          >
            <IconButton aria-label="edit" size="small" onClick={handleEditDish}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => {
                setTriggerDelete(true);
              }}
            >
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>

      <EditSub open={editModalOpen} onClose={() => setEditModalOpen(false)} sub={sub} />
    </React.Fragment>
  );
}

export default React.memo(SubOverviewItem);
