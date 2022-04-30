import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Divider, Grid, List, ListSubheader } from '@mui/material';
import ChoiceOverviewItem from './ChoiceOverviewItem';
import DeleteChoice from 'features/products/choices/components/DeleteChoice';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';

function ChoiceOverview() {
  const choicesArray = useSelector((state) => {
    let choicesArray = Object.values(state.menus.choices.byId);
    choicesArray.sort((a, b) => a.name.localeCompare(b.name));
    return choicesArray;
  });
  const selectedChoiceId = useSelector((state) => state.menus.views.itemId);
  const [triggerDelete, setTriggerDelete] = useState(false);

  return (
    <List sx={{ p: 0 }}>
      <ListSubheader
        sx={{
          color: 'common.white',
          bgcolor: 'primary.main',

          borderBottom: (theme) => '1px solid ' + theme.palette.primary.main,
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        <Grid container>
          <GridHeaderItem item xs={1}>
            ID
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Name
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Beschreibung
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Optionen
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Erstellt
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '234px' }}>
        {choicesArray.length === 0 ? (
          <EmptyView>Keine Optiongruppen verfügbar. Bitte erstellen Sie eine Optiongruppe...</EmptyView>
        ) : (
          choicesArray.map((choice, index) => (
            <React.Fragment key={choice.id}>
              <ChoiceOverviewItem
                choice={choice}
                setTriggerDelete={setTriggerDelete}
                selected={choice.id === selectedChoiceId}
              />
              {choicesArray.length >= 5 && index === choicesArray.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        )}
      </Box>
      <DeleteChoice trigger={triggerDelete} setTrigger={setTriggerDelete} choiceId={selectedChoiceId} />
    </List>
  );
}

export default ChoiceOverview;
