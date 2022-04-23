import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Divider, Grid, List, ListSubheader } from '@mui/material';
import SubOverviewItem from './SubOverviewItem';
import DeleteSub from 'features/offers/subs/components/DeleteSub';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';

function SubOverview() {
  const subsArray = useSelector((state) => {
    let subsArray = Object.values(state.offers.subs.byId);
    subsArray.sort((a, b) => a.name.localeCompare(b.name));
    return subsArray;
  });
  const selectedSubId = useSelector((state) => state.offers.views.itemId);
  const [triggerDelete, setTriggerDelete] = useState(false);

  return (
    <List sx={{ p: 0 }}>
      <ListSubheader
        sx={{
          color: 'common.white',
          backgroundColor: 'primary.main',

          borderBottom: (theme) => '1px solid ' + theme.palette.primary.main,
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        <Grid container>
          <GridHeaderItem item xs={3}>
            ID
          </GridHeaderItem>
          <GridHeaderItem item xs={3}>
            Name
          </GridHeaderItem>
          <GridHeaderItem item xs={3}>
            Erstellt
          </GridHeaderItem>
          <GridHeaderItem item xs={3}></GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '234px' }}>
        {subsArray.length === 0 ? (
          <EmptyView>Keine Optiongruppe verfügbar. Bitte erstellen Sie eine Optiongruppe...</EmptyView>
        ) : (
          subsArray.map((sub, index) => (
            <React.Fragment key={sub.id}>
              <SubOverviewItem sub={sub} setTriggerDelete={setTriggerDelete} selected={sub.id === selectedSubId} />
              {subsArray.length >= 5 && index === subsArray.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        )}
      </Box>
      <DeleteSub trigger={triggerDelete} setTrigger={setTriggerDelete} subId={selectedSubId} />
    </List>
  );
}

export default SubOverview;
