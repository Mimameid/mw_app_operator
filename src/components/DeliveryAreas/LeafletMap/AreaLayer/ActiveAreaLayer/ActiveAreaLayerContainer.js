import React from 'react';
import { connect } from 'react-redux';

import ActiveAreaLayer from './ActiveAreaLayer';

export const ActiveAreaLayerContainer = (props) => {
  return <ActiveAreaLayer {...props} />;
};

const mapStateToProps = (state) => ({
  activeArea: state.deliveryAreas.areaData.activeArea,
  draw: state.deliveryAreas.mode.draw,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAreaLayer);
