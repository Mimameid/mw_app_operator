import React from 'react';
import { useSelector } from 'react-redux';

import Category from 'features/menus/categories/components/Category';
import EmptyView from './EmptyView';

function CategoryView() {
  const activeCategoryId = useSelector((state) => state.menus.views.itemId);

  return activeCategoryId ? (
    <React.Fragment>
      <Category categoryId={activeCategoryId} />
    </React.Fragment>
  ) : (
    <EmptyView> Wählen Sie eine Kategorie aus der Liste aus, um sie anzuzeigen... </EmptyView>
  );
}

export default CategoryView;
