import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/menus/views/viewsSlice';

import { Grid, IconButton, ListItem, makeStyles } from '@material-ui/core';
import EditSub from 'features/menus/subs/components/EditSub';
import DeleteSub from 'features/menus/subs/components/DeleteSub';
import TruncatedGridItem from 'common/components/other/TruncatedGridItem';
import { DeleteForever, Edit } from '@material-ui/icons';

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

function SubOverviewItem({ sub, selected }) {
  const classes = useStyles();
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
        className={selected ? classes.highlight : null}
        button={!selected}
        onClick={!selected ? handleSelectCategory : null}
      >
        <Grid container>
          <TruncatedGridItem item xs={3}>
            {sub.id}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={3}>
            {sub.name}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={3}>
            {new Date(sub.created).toLocaleDateString('DE-de')}
          </TruncatedGridItem>
          <Grid className={selected ? null : classes.hidden} item xs={3}>
            <IconButton aria-label="edit" size="small" onClick={handleEditDish}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={handleDeleteDish}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
      <EditSub open={editModalOpen} setOpen={setEditModalOpen} sub={sub} />
      <DeleteSub trigger={triggerDelete} setTrigger={setTriggerDelete} subId={sub.id} />
    </React.Fragment>
  );
}

export default SubOverviewItem;