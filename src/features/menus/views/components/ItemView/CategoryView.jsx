import React from 'react';
import { useSelector } from 'react-redux';

import { Paper } from '@material-ui/core';
import Category from 'features/menus/categories/components/Category';
import EmptyView from './EmptyView';

function CategoryView() {
  const activeCategoryId = useSelector((state) => state.menus.views.itemId);

  return (
    <Paper variant="outlined">
      {activeCategoryId ? (
        <React.Fragment>
          <Category categoryId={activeCategoryId} />
        </React.Fragment>
      ) : (
        <EmptyView message="Wählen sie eine Kategorie aus der Liste aus, um sie anzuzeigen..." />
      )}
    </Paper>
  );
}

export default CategoryView;
