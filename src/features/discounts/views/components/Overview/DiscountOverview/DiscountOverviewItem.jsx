import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectDiscountItem } from 'features/discounts/views/slice';
import { setActive } from 'features/discounts/discounts/actions';
import { getDiscountTypeName } from 'common/constants';
import { getDiscountStatus } from 'features/discounts/discounts/utils';

import { Box, Grid, IconButton, ListItem, Switch } from '@mui/material';
import AlertDialog from 'common/components/feedback/AlertDialog';
import DiscountModal from 'features/discounts/discounts/components/DiscountModal';
import GridItem from 'common/components/dataDisplay/GridItem';
import TruncatedBox from 'features/products/common/components/TruncatedBox';
import { DeleteForever, Edit } from '@mui/icons-material';

function DiscountOverviewItem({ discount, setTriggerDelete, selected }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDectivateDialogOpen] = useState(false);
  const setActiveRef = useRef(false);

  function editEntryHandler(event) {
    setDiscountModalOpen(true);
  }

  function handleSelectDiscount(event) {
    dispatch(selectDiscountItem(discount.id));
  }

  async function handleSetActiveAcceptDialog(event) {
    setLoading(true);
    await dispatch(setActive({ discountId: discount.id, isActive: setActiveRef.current }));
    handleRejectDialog();
  }

  function setActiveHandler(event) {
    setActiveRef.current = event.target.checked;
    if (setActiveRef.current) {
      setActivateDialogOpen(true);
    } else {
      setDectivateDialogOpen(true);
    }
  }

  function handleRejectDialog(event) {
    setActivateDialogOpen(false);
    setDectivateDialogOpen(false);
  }

  const discountStatus = getDiscountStatus(discount);
  return (
    <React.Fragment>
      <ListItem
        sx={{ px: 2, py: 1, bgcolor: (theme) => (selected ? theme.palette.primary.light + '33' : null) }}
        button={!selected}
        onClick={!selected ? handleSelectDiscount : null}
      >
        <Grid container wrap={'nowrap'}>
          <GridItem item xs={2}>
            {discount.id}
          </GridItem>
          <GridItem item xs={2}>
            {discount.name}
          </GridItem>
          <GridItem item xs={2}>
            {getDiscountTypeName(discount.type)}
          </GridItem>
          <GridItem item xs={3}>
            <TruncatedBox display="flex">
              {new Date(discount.date.endDate).toLocaleDateString('DE-de')}
              <TruncatedBox color={discountStatus.color} fontSize="subtitle2.fontSize" fontStyle="italic">
                {discountStatus.statusText}
              </TruncatedBox>
            </TruncatedBox>
          </GridItem>
          {selected ? (
            <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={2}>
              <Switch
                checked={discount.isActive}
                onChange={setActiveHandler}
                color="primary"
                size="small"
                inputProps={{ 'aria-label': 'product available checkbox' }}
              />
            </Grid>
          ) : (
            <GridItem color={discount.isActive ? 'success.main' : 'grey.500'} fontStyle={'italic'} item xs={2}>
              {discount.isActive ? 'aktiv' : 'inaktiv'}
            </GridItem>
          )}
          <Grid item xs={1}>
            <Box
              sx={{ visibility: selected ? 'visible' : 'hidden' }}
              display="flex"
              flexGrow={1}
              justifyContent="flex-end"
            >
              <IconButton aria-label="edit" size="small" onClick={editEntryHandler}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton aria-label="edit" size="small" onClick={() => setTriggerDelete(true)}>
                <DeleteForever fontSize="small" color="error" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </ListItem>

      <AlertDialog
        open={activateDialogOpen}
        title="Rabattaktion aktivieren?"
        message="Wenn Sie die Rabattaktion aktivieren, ist sie ab sofort, sofern im Gültigkeitszeitraum, für die betroffenen Items wirksam."
        handleReject={handleRejectDialog}
        handleAccept={handleSetActiveAcceptDialog}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
      <AlertDialog
        open={deactivateDialogOpen}
        title="Rabattaktion deaktivieren?"
        message="Wenn Sie die Rabattaktion deaktivieren, ist sie ab sofort unwirksam."
        handleReject={handleRejectDialog}
        handleAccept={handleSetActiveAcceptDialog}
        warning
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />

      <DiscountModal open={discountModalOpen} onClose={() => setDiscountModalOpen(false)} discount={discount} />
    </React.Fragment>
  );
}

export default DiscountOverviewItem;
