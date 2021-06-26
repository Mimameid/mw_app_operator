import React, { useEffect } from 'react';

// import { useFetchUserData } from 'hooks/useFetchUserData';
import { useAuthenticate } from 'common/hooks/useAuthenticate';

function Dashboard() {
  // const [userData, fetchUserData] = useFetchUserData();
  useAuthenticate();

  useEffect(() => {
    // fetchUserData();
    // console.log(userData);
  }, []);

  return <div></div>;
}

export default Dashboard;
