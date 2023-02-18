import React from "react";
import { useNavigate } from "react-router-dom";

const ConnectButton = ({ accounts, setAccounts }) => {
    
    const navigate = useNavigate();
    const isConnected = Boolean(accounts[0]);
    
    // Función para conectarse con la wallet
    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
            console.log(accounts);
        }
        if (accounts !== []) {
            navigate('/dashboard');
        }
    }

    return (
        <div>
            <button className="connectbutton" onClick={connectAccount}><img className="sassyMainbtn img-fluid" alt="sassyMainbtn" /></button>
        </div>
    );
};

export default ConnectButton;