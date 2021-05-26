import React from 'react';
import { connect } from 'react-redux';
import { setLoggedIn } from '../../../store/userState/auth/actions';
import { toggleDraw, resetChanged } from '../../../store/deliveryZone/mode/actions';
import { deactivateArea } from '../../../store/deliveryZone/areaData/actions';

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
