import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectDiscountItem } from 'features/discounts/views/slice';
import { deleteDiscount, setActivationDiscount } from 'features/discounts/discounts/actions';

import { Box, Grid, IconButton, ListItem, Switch, makeStyles } from '@material-ui/core';
import WarningDialog from 'common/components/dialogs/WarningDialog';
import DiscountModal from 'features/discounts/discounts/components/DiscountModal';
import TruncatedGridItem from 'common/components/other/TruncatedGridItem';
import { DeleteForever, Edit } from '@material-ui/icons';
import CustomDialog from 'common/components/dialogs/CustomDialog';

const useStyles = makeStyles((theme) => ({
  noHover: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light + '33',
    },
  },
  highlight: {
    background: theme.palette.primary.light + '33',
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
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const ref = useRef(false);

  function editEntryHandler(event) {
    setMenuModalOpen(true);
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
        <Grid container>
          <TruncatedGridItem item xs={2}>
            {discount.id}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {discount.name}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {discount.desc}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {discount.type}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {new Date(discount.created).toLocaleDateString('DE-de')}
          </TruncatedGridItem>
          {selected ? (
            <TruncatedGridItem item xs={1}>
              <Switch
                checked={discount.active}
                onChange={handleToggleActivateDiscount}
                color="primary"
                size="small"
                inputProps={{ 'aria-label': 'dish available checkbox' }}
              />
            </TruncatedGridItem>
          ) : discount.active ? (
            <TruncatedGridItem color={'green'} fontStyle={'italic'} item xs={1}>
              aktiv
            </TruncatedGridItem>
          ) : null}

          <Box className={selected ? null : classes.hidden} flexGrow={1} textAlign="right">
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
        title="Rabatt löschen?"
        message="Dieser Vorgang kann nicht rückgängig gemacht werden."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        warning
      />
      <CustomDialog
        open={activateDialogOpen}
        title="Rabatt aktivieren?"
        message="Wenn Sie den Rabatt aktivieren, ist er ab sofort für die betroffenen Items wirksam."
        handleReject={handleRejectDialog}
        handleAccept={handleSwitchAcceptDialog}
      />
      <WarningDialog
        open={deactivateDialogOpen}
        title="Rabatt deaktivieren?"
        message="Wenn Sie den Rabatt deaktivieren, ist er ab sofort unwirksam."
        handleReject={handleRejectDialog}
        handleAccept={handleSwitchAcceptDialog}
        warning
      />
      <DiscountModal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} discount={discount} />
    </React.Fragment>
  );
}

export default DiscountOverviewItem;
