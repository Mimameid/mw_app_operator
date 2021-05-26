import React from 'react';
import { connect } from 'react-redux';
import { createArea, addPolygon, saveArea } from '../../../../../store/deliveryZone/areaData/actions';
import { setStatusRequest, setStatusError } from '../../../../../store/statusCode/actions';

import PLZDrawer from './PLZDrawer';

export const PLZDrawerContainer = (props) => {
  return <PLZDrawer {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryZone.mode.draw,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createArea: () => dispatch(createArea()),
    addPolygon: (polygon) => dispatch(addPolygon(polygon)),
    saveArea: () => dispatch(saveArea()),
    setStatusRequest: (message) => dispatch(setStatusRequest(message)),
    setStatusError: (message) => dispatch(setStatusError(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PLZDrawerContainer);
