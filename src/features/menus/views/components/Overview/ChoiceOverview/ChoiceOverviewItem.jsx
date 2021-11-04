import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/menus/views/slice';

import { Box, Grid, IconButton, ListItem } from '@mui/material';
import EditChoice from 'features/menus/choices/components/EditChoice';
import DeleteChoice from 'features/menus/choices/components/DeleteChoice';
import GridItem from 'common/components/dataDisplay/GridItem';
import { DeleteForever, Edit } from '@mui/icons-material';

function ChoiceOverviewItem({ choice, selected }) {
  const dispatch = useDispatch();

  const [triggerDelete, setTriggerDelete] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleEditDish(event) {
    setEditModalOpen(true);
  }

  function handleSelectChoice(event) {
    dispatch(selectItem(choice.id));
  }

  function handleDeleteDish(event) {
    setTriggerDelete(true);
  }

  return (
    <React.Fragment>
      <ListItem
        sx={{ px: 2, py: 1, bgcolor: (theme) => (selected ? theme.palette.primary.light + '33' : null) }}
        button={!selected}
        onClick={!selected ? handleSelectChoice : null}
      >
        <Grid container>
          <GridItem item xs={1}>
            {choice.id}
          </GridItem>
          <GridItem item xs={2}>
            {choice.name}
          </GridItem>
          <GridItem item xs={2}>
            {choice.desc}
          </GridItem>
          <GridItem item xs={2}>
            {choice.subs.length}
          </GridItem>
          <GridItem item xs={2}>
            {new Date(choice.created).toLocaleDateString('DE-de')}
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
      <EditChoice open={editModalOpen} setOpen={setEditModalOpen} choice={choice} />
      <DeleteChoice trigger={triggerDelete} setTrigger={setTriggerDelete} choiceId={choice.id} />
    </React.Fragment>
  );
}

export default ChoiceOverviewItem;
