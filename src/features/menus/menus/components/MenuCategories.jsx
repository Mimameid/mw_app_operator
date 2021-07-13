import React from 'react';

import { Divider, makeStyles, List, Box } from '@material-ui/core';
import Category from '../../categories/components/Category';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    padding: 0,
  },
  list: {
    paddingBottom: 0,
  },
}));

function MenuCategories({ menu }) {
  const classes = useStyles();

  const categoryIds = menu.categories;
  return (
    <List className={classes.listContainer}>
      {categoryIds.length > 0 ? (
        categoryIds.map((categoryId, index) => (
          <React.Fragment key={categoryId}>
            <Category categoryId={categoryId} menu={menu} />
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <Box color="text.secondary" fontStyle="italic" p={1}>
          Keine Kategorien verfügbar. Bitte fügen Sie eine Kategorie hinzu...
        </Box>
      )}
    </List>
  );
}

export default MenuCategories;
