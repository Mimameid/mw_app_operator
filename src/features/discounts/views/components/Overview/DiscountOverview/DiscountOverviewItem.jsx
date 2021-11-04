import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectDiscountItem } from 'features/discounts/views/slice';
import { deleteDiscount, setActivationDiscount } from 'features/discounts/discounts/actions';
import { getDiscountTypeName } from 'common/constants';
import { getDiscountStatus } from 'features/discounts/discounts/utils';

import { Box, Grid, IconButton, ListItem, Switch } from '@mui/material';
import WarningDialog from 'common/components/feedback/WarningDialog';
import DiscountModal from 'features/discounts/discounts/components/DiscountModal';
import GridItem from 'common/components/dataDisplay/GridItem';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import CustomDialog from 'common/components/feedback/CustomDialog';
import { DeleteForever, Edit } from '@mui/icons-material';

function DiscountOverviewItem({ discount, selected }) {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDectivateDialogOpen] = useState(false);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const ref = useRef(false);

  function editEntryHandler(event) {
    setDiscountModalOpen(true);
  }

  function handleSelectMenu(event) {
    dispatch(selectDiscountItem(discount.id));
  }

  function deleteEntryHandler(event) {
    setDialogOpen(true);
  }

  function handleRejectDialog(event) {
    setDialogOpen(false);
    setActivateDialogOpen(false);
    setDectivateDialogOpen(false);
  }

  function handleAcceptDialog(event) {
    dispatch(deleteDiscount(discount.id));
    setDialogOpen(false);
  }

  function handleSwitchAcceptDialog(event) {
    dispatch(setActivationDiscount({ discountId: discount.id, isActive: ref.current }));
    setDialogOpen(false);
  }

  function handleToggleActivateDiscount(event) {
    ref.current = event.target.checked;
    if (ref.current) {
      setActivateDialogOpen(true);
    } else {
      setDectivateDialogOpen(true);
    }
  }
  console.log(discount);
  const discountStatus = getDiscountStatus(discount);
  return (
    <React.Fragment>
      <ListItem
        sx={{ bgcolor: (theme) => (selected ? theme.palette.primary.light + '33' : null) }}
        button={!selected}
        onClick={!selected ? handleSelectMenu : null}
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
              <TruncatedBox color={discountStatus.color} fontSize="subtitle2.fontSize" fontStyle="italic" pl={1}>
                {discountStatus.statusText}
              </TruncatedBox>
            </TruncatedBox>
          </GridItem>
          {selected ? (
            <GridItem item xs={1}>
              <Switch
                checked={discount.isActive}
                onChange={handleToggleActivateDiscount}
                color="primary"
                size="small"
                inputProps={{ 'aria-label': 'dish available checkbox' }}
              />
            </GridItem>
          ) : (
            <GridItem color={discount.isActive ? 'success.main' : 'error.main'} fontStyle={'italic'} item xs={1}>
              {discount.isActive ? 'aktiv' : 'inaktiv'}
            </GridItem>
          )}

          <Box
            sx={{ visibility: selected ? 'hidden' : 'visible' }}
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
          >
            <IconButton aria-label="edit" size="small" onClick={editEntryHandler}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={deleteEntryHandler}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>
      <WarningDialog
        open={dialogOpen}
        title="Rabattaktion löschen?"
        message="Dieser Vorgang kann nicht rückgängig gemacht werden."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        warning
      />
      <CustomDialog
        open={activateDialogOpen}
        title="Rabattaktion aktivieren?"
        message="Wenn Sie die Rabattaktion aktivieren, ist sie ab sofort, sofern im Gültigkeitszeitraum, für die betroffenen Items wirksam."
        handleReject={handleRejectDialog}
        handleAccept={handleSwitchAcceptDialog}
      />
      <WarningDialog
        open={deactivateDialogOpen}
        title="Rabattaktion deaktivieren?"
        message="Wenn Sie die Rabattaktion deaktivieren, ist sie ab sofort unwirksam."
        handleReject={handleRejectDialog}
        handleAccept={handleSwitchAcceptDialog}
        warning
      />
      <DiscountModal open={discountModalOpen} onClose={() => setDiscountModalOpen(false)} discount={discount} />
    </React.Fragment>
  );
}

export default DiscountOverviewItem;
