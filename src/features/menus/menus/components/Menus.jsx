import React, { useState, useEffect } from 'react';

import { Paper, Box, Button, Tabs, Tab, makeStyles } from '@material-ui/core';
import MenuList from './MenuList';
import CreateMenuModal from './CreateMenuModal';
// import CategoryOverview from 'features/menus/categories/components/CategoryOverview';

// const useStyles = makeStyles((theme) => ({
//   tab: {
//     boxShadow: theme.shadows[2],
//   },
// }));

function Menus() {
  // const classes = useStyles();
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  // const [value, setValue] = useState(0);

  const [name, setName] = useState();
  useEffect(() => {
    setName(name);
  }, [name]);

  function handleAddMenu(event) {
    setAddMenuOpen(true);
  }

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <Paper variant="outlined">
      <Box display="flex" justifyContent="space-between" p={1}>
        <Box color="primary" fontSize="h6.fontSize" fontWeight="fontWeightBold" ml={1} mt={1}>
          Meine Menüs
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddMenu}>
          Erstellen
        </Button>
      </Box>
      <MenuList />

      {/* <Tabs indicatorColor="primary" value={value} onChange={handleChange} aria-label="menu tabs">
        <Tab className={value === 0 ? classes.tab : null} label="Menüs" />
        <Tab className={value === 1 ? classes.tab : null} label="Kategorien" />
        <Tab label="Speisen" />
        <Tab label="Extras" />
        <Tab label="Optionen" />
      </Tabs>
      {value === 0 ? <MenuList /> : null}
      {value === 1 ? <CategoryOverview /> : null} */}

      <CreateMenuModal open={addMenuOpen} setOpen={setAddMenuOpen} />
    </Paper>
  );
}

export default Menus;
