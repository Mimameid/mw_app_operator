import React from 'react';
import { connect } from 'react-redux';
import { addPoint, unselectVertex } from '../../../store/deliveryZoneState/action';
import { disableWidthChanged } from '../../../store/drawerState/action';

import LeafletMap from './LeafletMap';

export const LeafletMapContainer = (props) => {
  return <LeafletMap {...props} />;
};

const mapStateToProps = (state) => ({
  deliveryZoneState: state.deliveryZoneState,
  widthChanged: state.drawerState.widthChanged,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addPoint: (point) => dispatch(addPoint(point)),
    unselectVertex: () => dispatch(unselectVertex()),
    disableWidthChanged: () => dispatch(disableWidthChanged()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletMapContainer);
