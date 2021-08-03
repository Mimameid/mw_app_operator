import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/menus/views/viewsSlice';

import { Grid, IconButton, ListItem } from '@material-ui/core';
import TruncatedGridItem from 'common/components/other/TruncatedGridItem';
import EditCategory from 'features/menus/categories/components/EditCategory';
import DeleteCategory from 'features/menus/categories/components/DeleteCategory';
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
  wrap: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      overflow: 'visible',
      whiteSpace: 'normal',
    },
  },
}));

function CategoryOverviewItem({ category, selected }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  function handleEditCategory(event) {
    setEditCategoryOpen(true);
  }

  function handleSelectCategory(event) {
    dispatch(selectItem(category.id));
  }

  function handleDeleteCategory(event) {
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
          <TruncatedGridItem item xs={2}>
            {category.id}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {category.name}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {category.desc}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {category.dishes.length}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {new Date(category.created).toLocaleDateString('DE-de')}
          </TruncatedGridItem>
          <Grid className={selected ? null : classes.hidden} item xs={2}>
            <IconButton aria-label="edit" size="small" onClick={handleEditCategory}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={handleDeleteCategory}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
      <EditCategory open={editCategoryOpen} setOpen={setEditCategoryOpen} category={category} />
      <DeleteCategory trigger={triggerDelete} setTrigger={setTriggerDelete} categoryId={category.id} />
    </React.Fragment>
  );
}

export default CategoryOverviewItem;
