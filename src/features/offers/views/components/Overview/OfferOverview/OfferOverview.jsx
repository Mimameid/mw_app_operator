import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOffer } from 'features/offers/offers/actions';
import { selectActiveOffer } from 'features/offers/offers/slice';

import { Box, Divider, Grid, List, ListSubheader } from '@mui/material';
import OfferOverviewItem from './OfferOverviewItem';
import AlertDialog from 'common/components/feedback/AlertDialog';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';

function OfferOverview() {
  const dispatch = useDispatch();
  const offersArray = useSelector((state) => {
    let offersArray = Object.values(state.offers.offers.byId);
    offersArray.sort((a, b) => a.name.localeCompare(b.name));
    return offersArray;
  });

  const activeOffer = useSelector(selectActiveOffer);
  const selectedOfferId = useSelector((state) => state.offers.views.itemId);
  const selectedOffer = useSelector((state) => state.offers.offers.byId[selectedOfferId]);

  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const deleteHandler = useCallback((offer) => {
    setDeleteDialogOpen(true);
  }, []);

  function handleRejectDialog(event) {
    setDeleteDialogOpen(false);
  }

  async function handleDeleteAcceptDialog(event) {
    setLoading(true);
    await dispatch(deleteOffer(selectedOfferId));
    setDeleteDialogOpen(false);
  }

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
            Kategorie
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Erstellt
          </GridHeaderItem>
          <GridHeaderItem item xs={1}>
            Aktiv
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '234px' }}>
        {offersArray.length === 0 ? (
          <EmptyView>Keine Speisekarten verfügbar. Bitte erstellen Sie eine Speisekarte...</EmptyView>
        ) : (
          offersArray.map((offer, index) => (
            <React.Fragment key={offer.id}>
              <OfferOverviewItem
                offer={offer}
                selected={offer.id === selectedOfferId}
                activeOffer={activeOffer}
                deleteHandler={deleteHandler}
              />
              {offersArray.length >= 5 && index === offersArray.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        )}
      </Box>
      <AlertDialog
        open={deleteDialogOpen}
        title="Speisekarte löschen?"
        message={
          selectedOffer && selectedOffer.isActive
            ? 'Bitte deaktivieren Sie die Speisekarte, um sie löschen zu können.'
            : 'Dieser Vorgang kann nicht rückgängig gemacht werden.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleDeleteAcceptDialog}
        disabled={selectedOffer ? selectedOffer.isActive : false}
        loading={loading}
        warning
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
    </List>
  );
}

export default OfferOverview;
