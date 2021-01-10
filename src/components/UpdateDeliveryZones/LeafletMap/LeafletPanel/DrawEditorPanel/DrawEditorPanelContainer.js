import React from 'react';
import { connect } from 'react-redux';
import { saveArea, toggleDeleteMode } from '../../../../../store/deliveryZoneState/action';

import DrawEditorPanel from './DrawEditorPanel';

export const DrawEditorPanelContainer = (props) => {
  return <DrawEditorPanel {...props} />;
};

const mapStateToProps = (state) => ({
  deliveryZoneState: state.deliveryZoneState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveArea: () => dispatch(saveArea()),
    toggleDeleteMode: () => dispatch(toggleDeleteMode()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawEditorPanelContainer);
