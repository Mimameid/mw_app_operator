import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectDiscountItem } from 'features/discounts/views/slice';
import { deleteDiscount, setActivationDiscount } from 'features/discounts/discounts/actions';
import { getDiscountTypeName } from 'common/constants';

import { Box, Grid, IconButton, ListItem, Switch, makeStyles } from '@material-ui/core';
import WarningDialog from 'common/components/dialogs/WarningDialog';
import DiscountModal from 'features/discounts/discounts/components/DiscountModal';
import GridItem from 'common/components/other/GridItem';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import CustomDialog from 'common/components/dialogs/CustomDialog';
import { DeleteForever, Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  highlight: {
    background: theme.palette.primary.light + '85',
  },
  hidden: {
    visibility: 'hidden',
  },
  wrap: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      overflow: 'visible',
      whiteSpace: 'normal',
    },
  },
}));

function DiscountOverviewItem({ discount, selected }) {
  const classes = useStyles();
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
    dispatch(setActivationDiscount({ discountId: discount.id, active: ref.current }));
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

  return (
    <React.Fragment>
      <ListItem
        className={selected ? classes.highlight : null}
        button={!selected}
        onClick={!selected ? handleSelectMenu : null}
      >
        <Grid container wrap={'nowrap'}>
          <GridItem item xs={1}>
            {discount.id}
          </GridItem>
          <GridItem item xs={2}>
            {discount.name}
          </GridItem>
          <GridItem item xs={2}>
            {discount.desc}
          </GridItem>
          <GridItem item xs={2}>
            {getDiscountTypeName(discount.type)}
          </GridItem>
          <GridItem item xs={2}>
            <TruncatedBox display="flex">
              {new Date(discount.date.endDate).toLocaleDateString('DE-de')}
              <TruncatedBox color="error.main" fontSize="subtitle2.fontSize" fontStyle="italic" pl={1}>
                {discount.expired ? 'abgelaufen' : null}
              </TruncatedBox>
            </TruncatedBox>
          </GridItem>
          {selected ? (
            <GridItem item xs={1}>
              <Switch
                checked={discount.active}
                onChange={handleToggleActivateDiscount}
                color="primary"
                size="small"
                inputProps={{ 'aria-label': 'dish available checkbox' }}
              />
            </GridItem>
          ) : (
            <GridItem color={discount.active ? 'success' : 'error'} fontStyle={'italic'} item xs={1}>
              {discount.active ? 'aktiv' : 'inaktiv'}
            </GridItem>
          )}

          <Box className={selected ? null : classes.hidden} display="flex" flexGrow={1} justifyContent="flex-end">
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
        message="Wenn Sie die Rabattaktion aktivieren, ist sie ab sofort für die betroffenen Items wirksam."
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
