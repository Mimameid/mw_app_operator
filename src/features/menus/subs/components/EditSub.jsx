import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAffectedChoices } from 'features/menus/choices/slice';

import WarningDialog from 'common/components/dialogs/WarningDialog';
import SubModal from './SubModal';

function EditSub({ open, setOpen, sub }) {
  const selectAffectedChoices = useMemo(makeSelectAffectedChoices, []);
  let affectedChoices = useSelector((state) => selectAffectedChoices(state, sub.id));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setOpen(false);
      if (affectedChoices.length > 0) {
        setDialogOpen(true);
        return;
      }
      setModalOpen(true);
    }
  }, [open, affectedChoices, setOpen]);

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setDialogOpen(false);
    setModalOpen(true);
  };

  affectedChoices = affectedChoices.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <SubModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        sub={sub}
      />
      <WarningDialog
        open={dialogOpen}
        title="Option bearbeiten?"
        message={
          'Das Bearbeiten der Option ändert die Option in sämtlichen Optiongruppen. Betroffene Optiongruppen: ' +
          affectedChoices.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
    </React.Fragment>
  );
}

export default EditSub;
