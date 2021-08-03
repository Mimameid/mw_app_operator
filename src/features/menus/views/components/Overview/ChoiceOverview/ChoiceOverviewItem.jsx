import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/menus/views/viewsSlice';

import { Grid, IconButton, ListItem } from '@material-ui/core';
import EditChoice from 'features/menus/choices/components/EditChoice';
import DeleteChoice from 'features/menus/choices/components/DeleteChoice';
import TruncatedGridItem from 'common/components/other/TruncatedGridItem';
import { DeleteForever, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  noHover: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light + '33',
    },
  },
  highlight: {
    background: theme.palette.primary.light + '33',
  },
  hidden: {
    visibility: 'hidden',
  },
}));

function ChoiceOverviewItem({ choice, selected }) {
  const classes = useStyles();
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
        className={selected ? classes.highlight : null}
        button={!selected}
        onClick={!selected ? handleSelectChoice : null}
      >
        <Grid container>
          <TruncatedGridItem item xs={2}>
            {choice.id}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {choice.name}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {choice.desc}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {choice.subs.length}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {new Date(choice.created).toLocaleDateString('DE-de')}
          </TruncatedGridItem>
          <Grid className={selected ? null : classes.hidden} item xs={2}>
            <IconButton aria-label="edit" size="small" onClick={handleEditDish}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={handleDeleteDish}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
      <EditChoice open={editModalOpen} setOpen={setEditModalOpen} choice={choice} />
      <DeleteChoice trigger={triggerDelete} setTrigger={setTriggerDelete} choiceId={choice.id} />
    </React.Fragment>
  );
}

export default ChoiceOverviewItem;
