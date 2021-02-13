import React from 'react';
import { connect } from 'react-redux';

import ActiveAreaLayer from './ActiveAreaLayer';

export const ActiveAreaLayerContainer = (props) => {
  return <ActiveAreaLayer {...props} />;
};

const mapStateToProps = (state) => ({
  activeArea: state.deliveryZoneState.activeArea,
  drawMode: state.deliveryZoneState.drawMode,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAreaLayer);
