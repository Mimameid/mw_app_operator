import React, { useEffect } from 'react';

import { useFetchUserData } from '../../hooks/useFetchUserData';

function Dashboard() {
  const [userData, fetchUserData] = useFetchUserData();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  console.log(userData);
  return <div></div>;
}

export default Dashboard;
