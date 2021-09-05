import React from 'react';
import { Redirect } from 'react-router';

function ProtectedPage({ loggedIn, children }) {
  return loggedIn ? children : <Redirect to="/login" />;
}

export default ProtectedPage;
