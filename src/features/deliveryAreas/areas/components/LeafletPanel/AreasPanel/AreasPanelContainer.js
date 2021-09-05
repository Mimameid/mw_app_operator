import React from 'react';
import { connect } from 'react-redux';

import AreasPanel from './AreasPanel';

export const AreasPanelContainer = (props) => {
  return <AreasPanel {...props} />;
};

const mapStateToProps = (state) => ({
  edited: state.mode.edited,
  draw: state.mode.draw,

  areas: state.deliveryAreas.areas.areas,
  areaNumber: state.deliveryAreas.areas.activeArea.areaNumber,
});

export default connect(mapStateToProps, null)(AreasPanelContainer);
