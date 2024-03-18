import React from 'react';
import { useDisconnect } from '@thirdweb-dev/react';

//Logout component for Disconnecting the MetaMask Connection

const Logout = () => {
  const { deactivate } = useStateContext(useDisconnect);

  const handleLogout = () => {
    deactivate();
  };

  return (
    <div>
      <h1>Logout Page</h1>
      <p>Are you sure you want to logout?</p>
      {handleLogout}
    </div>
  );
};

export default Logout;