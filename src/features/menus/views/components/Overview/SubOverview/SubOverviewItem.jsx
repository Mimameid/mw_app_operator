import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/menus/views/slice';

import { Box, Grid, IconButton, ListItem } from '@mui/material';
import EditSub from 'features/menus/subs/components/EditSub';
import DeleteSub from 'features/menus/subs/components/DeleteSub';
import GridItem from 'common/components/dataDisplay/GridItem';
import { DeleteForever, Edit } from '@mui/icons-material';

function SubOverviewItem({ sub, selected }) {
  const dispatch = useDispatch();

  const [triggerDelete, setTriggerDelete] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleEditDish(event) {
    setEditModalOpen(true);
  }

  function handleSelectCategory(event) {
    dispatch(selectItem(sub.id));
  }

  function handleDeleteDish(event) {
    setTriggerDelete(true);
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
            <IconButton aria-label="edit" size="small" onClick={handleDeleteDish}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>
      <EditSub open={editModalOpen} setOpen={setEditModalOpen} sub={sub} />
      <DeleteSub trigger={triggerDelete} setTrigger={setTriggerDelete} subId={sub.id} />
    </React.Fragment>
  );
}

export default SubOverviewItem;
