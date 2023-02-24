import React from "react";
import { useNavigate } from "react-router-dom";

import useWallet from "../hooks/useWallet";

const ConnectButton = () => {
  const { connect, isConnected } = useWallet();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isConnected) navigate("/dashboard");
  }, [isConnected]);

  return (
    <div>
      <button className="connectbutton" onClick={connect}>
        <img className="sassyMainbtn img-fluid" alt="sassyMainbtn" />
      </button>
    </div>
  );
};

export default ConnectButton;
