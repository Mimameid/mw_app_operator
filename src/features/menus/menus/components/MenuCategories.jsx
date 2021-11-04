import React from 'react';

import { Divider, List, Box } from '@mui/material';
import Category from '../../categories/components/Category';

function MenuCategories({ menu }) {
  const categoryIds = menu.categories;
  return (
    <List sx={{ p: 0 }}>
      {categoryIds.length > 0 ? (
        categoryIds.map((categoryId, index) => (
          <React.Fragment key={categoryId}>
            <Category categoryId={categoryId} menu={menu} />
            {index < categoryIds.length - 1 ? <Divider /> : null}
          </React.Fragment>
        ))
      ) : (
        <Box color="text.secondary" fontStyle="italic" p={2}>
          Dieses Menü hat noch keine Kategorien. Bitte fügen Sie eine Kategorie hinzu...
        </Box>
      )}
    </List>
  );
}

export default MenuCategories;
