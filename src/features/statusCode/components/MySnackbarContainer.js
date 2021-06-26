import React from 'react';
import { connect } from 'react-redux';

import MySnackBar from './MySnackbar';

function MySnackbarContainer({ statusCode, statusMessage, count }) {
  return <MySnackBar type={statusCode} message={statusMessage} count={count} />;
}

const mapStateToProps = (state) => {
  return {
    statusCode: state.statusCode.statusCode,
    statusMessage: state.statusCode.statusMessage,
    count: state.statusCode.count,
  };
};

export default connect(mapStateToProps, null)(MySnackbarContainer);
