import React from 'react';
import { connect } from 'react-redux';
import { addPoint, unselectVertex } from '../../../../store/deliveryZoneState/action';

import PolygonLayer from './PolygonLayer';

export const PolygonLayerContainer = (props) => {
  return <PolygonLayer {...props} />;
};

const mapStateToProps = (state) => ({
  deliveryZoneState: state.deliveryZoneState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addPoint: (point) => dispatch(addPoint(point)),
    unselectVertex: () => dispatch(unselectVertex()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolygonLayerContainer);
