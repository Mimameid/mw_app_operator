import React from 'react';
import { connect } from 'react-redux';
import { setLoggedIn } from '../../store/userState/auth/actions';

import Login from './Login.jsx';

export const LoginContainer = (props) => {
  return <Login {...props}></Login>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: (value) => dispatch(setLoggedIn(value)),
  };
};

export default connect(null, mapDispatchToProps)(LoginContainer);
