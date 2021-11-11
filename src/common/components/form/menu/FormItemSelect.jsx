import React from 'react';
import { useController } from 'react-hook-form';

import { Box, Divider, List } from '@mui/material';

function FormItemSelect({ name, control, placeholder, items, RenderComponent }) {
  const { field: inputProps } = useController({ name, control });

  const handleToggle = (value) => () => {
    const currentIndex = inputProps.value.indexOf(value);
    const newChecked = [...inputProps.value];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    inputProps.onChange(newChecked);
  };

  return (
    <List sx={{ position: 'relative', overflow: 'auto', maxHeight: 320, height: '304px', padding: 0 }}>
      {items.length === 0 ? (
        <Box color="text.secondary" fontStyle="italic" p={1}>
          {placeholder}
        </Box>
      ) : (
        <React.Fragment>
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <RenderComponent
                item={item}
                checked={inputProps.value.indexOf(item.id) !== -1}
                handleToggle={handleToggle}
              />
              {index < items.length - 1 ? <Divider /> : items.length < 5 ? <Divider /> : null}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </List>
  );
}

export default FormItemSelect;
