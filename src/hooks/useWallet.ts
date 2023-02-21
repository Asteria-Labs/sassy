import { useContext } from "react";
import { walletContext } from "../contexts/WalletContext";

export default function useWallet() {
  const context = useContext(walletContext);
  if (context === undefined) {
    throw new Error("walletContext must be used within a WalletProvider");
  }

  return context;
}
