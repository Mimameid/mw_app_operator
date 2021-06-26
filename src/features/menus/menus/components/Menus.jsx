import React, { useState, useEffect } from 'react';

import { Paper, Box, Button } from '@material-ui/core';
import MenuList from './MenuList';
import CreateMenuModal from './CreateMenuModal';

function Menus() {
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  const [name, setName] = useState();
  useEffect(() => {
    setName(name);
  }, [name]);

  function handleAddMenu(event) {
    setAddMenuOpen(true);
  }

  return (
    <Paper variant="outlined">
      <Box display="flex" justifyContent="space-between" p={1}>
        <Box color="primary" fontSize="h6.fontSize" ml={1} mt={1}>
          Meine Menüs
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddMenu}>
          Erstellen
        </Button>
      </Box>
      <MenuList />
      <CreateMenuModal open={addMenuOpen} setOpen={setAddMenuOpen} />
    </Paper>
  );
}

export default Menus;
