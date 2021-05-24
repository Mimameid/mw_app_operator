import React from 'react';
import { connect } from 'react-redux';
import { setLoggedIn } from '../../../store/userState/authState/action';
import { toggleDraw, resetChanged } from '../../../store/deliveryZone/mode/action';
import { deactivateArea } from '../../../store/deliveryZone/areaData/action';

import NavigationLink from './NavigationLink';

export const NavigationLinkContainer = (props) => {
  return <NavigationLink {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryZone.mode.draw,
  changed: state.deliveryZone.mode.changed,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    setLoggedIn: (value) => dispatch(setLoggedIn(value)),
    resetChanged: () => dispatch(resetChanged()),
    toggleDraw: () => dispatch(toggleDraw()),
    deactivateArea: () => dispatch(deactivateArea()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationLinkContainer);
