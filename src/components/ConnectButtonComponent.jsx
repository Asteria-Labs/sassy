import React from "react";
import { useNavigate } from "react-router-dom";

import useWallet from "../hooks/useWallet";

const ConnectButton = () => {
  const { connect } = useWallet();
  const navigate = useNavigate();

  // Función para conectarse con la wallet
  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // setAccounts(accounts);
      // console.log(accounts);
    }
    // if (accounts !== []) {
    //   navigate("/dashboard");
    // }
  }

  return (
    <div>
      <button className="connectbutton" onClick={connect}>
        <img className="sassyMainbtn img-fluid" alt="sassyMainbtn" />
      </button>
    </div>
  );
};

export default ConnectButton;
