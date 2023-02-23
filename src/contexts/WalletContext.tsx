import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import Fortmatic from 'fortmatic';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { toast } from 'react-toastify';
import React, {
  createContext, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';

import {
  CHAIN_ID,
  NETWORK,
  FORTMATIC_KEY,
  ETHEREUM_URL,
  APP_NAME, WEB3MODAL,
} from '../config';

export type WalletContextType = {
  address: string;
  signer: ethers.Signer;
  provider: ethers.providers.Web3Provider;
  readOnlyProvider: ethers.providers.JsonRpcProvider;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  isDisconnecting: boolean;
}

const NETWORK_ALT_NAMES = {
  homestead: 'Ethereum Mainnet',
  matic: 'Polygon Mainnet',
  ropsten: 'Ropsten Testnet',
  rinkeby: 'Rinkeby Testnet',
  goerli: 'Goerli Testnet',
  sepolia: 'Sepolia Testnet',
  maticmum: 'Polygon Mumbai Testnet',
} as { [key: string]: string };

export const walletContext = createContext<Partial<WalletContextType>>({});

/**
 * Provides a global wallet context for the app
 *
 * @param children Component to provide context to
 * @param autoLogin If true, enables provider caching and autoconnect on load
 * @constructor
 */
export default function WalletProvider(
  { children, autoLogin = false }: { children: ReactNode, autoLogin: boolean },
) {
  const [address, setAddress] = useState<string>();
  const [signer, setSigner] = useState<ethers.Signer>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();

  const readOnlyProvider = useMemo(
    () => new ethers.providers.JsonRpcProvider(ETHEREUM_URL, NETWORK),
    [],
  );

  useEffect(() => {
    const providerOptions = {
      ...(true ? {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: { [CHAIN_ID]: ETHEREUM_URL },
            // infuraId: INFURA_ID,
          },
        },
        coinbasewallet: {
          package: CoinbaseWalletSDK,
          options: {
            appName: APP_NAME,
            // infuraId: INFURA_ID,
            chainId: CHAIN_ID,
            darkMode: true,
          },
        },
      } : {}),
      ...(FORTMATIC_KEY ? {
        fortmatic: {
          package: Fortmatic,
          options: { key: FORTMATIC_KEY },
        },
      } : {}),
    };

    setWeb3Modal(new Web3Modal({
      network: NETWORK === 'homestead' ? 'mainnet' : NETWORK,
      cacheProvider: autoLogin,
      disableInjectedProvider: false,
      providerOptions,
      theme: WEB3MODAL.THEME,
    }));
  }, [autoLogin]);

  const connect = useCallback(async () => {
    try {
      if (!web3Modal) {
        return;
      }

      setIsConnecting(true);

      if (!autoLogin) web3Modal.clearCachedProvider();

      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const network = await web3Provider.getNetwork();

      if (network.name !== NETWORK) {
        const currentNetworkName = NETWORK_ALT_NAMES[network.name] || network.name;
        const targetNetworkName = NETWORK_ALT_NAMES[NETWORK] || NETWORK;

        toast.error(`Your network is currently set to ${currentNetworkName}. Please change your network to ${targetNetworkName} to continue.`);

        setIsConnecting(false);

        return;
      }

      setProvider(web3Provider);
      setAddress(address);
      setSigner(signer);
      setIsConnected(true);
      setIsConnecting(false);
    } catch (error) {
      setIsConnecting(false);
      toast.error((error as Error).message);
      console.error(error);
    }
  }, [autoLogin, web3Modal]);

  useEffect(() => {
    if (autoLogin && web3Modal?.cachedProvider) {
      connect();
    }
  }, [autoLogin, connect, web3Modal]);

  const disconnect = useCallback(async () => {
    try {
      if (!web3Modal) {
        return;
      }
      setIsDisconnecting(true);

      web3Modal.clearCachedProvider();

      setProvider(undefined);
      setAddress(undefined);
      setSigner(undefined);
      setIsConnected(false);
      setIsDisconnecting(false);
    } catch (error: any) {
      setIsDisconnecting(false);
      toast.error(error?.message);
      console.error(error);
    }
  }, [web3Modal]);

  const state = useMemo(() => ({
    address,
    signer,
    provider,
    readOnlyProvider,
    isConnected,
    isConnecting,
    isDisconnecting,
    connect,
    disconnect,
  }), [
    address,
    signer,
    provider,
    readOnlyProvider,
    isConnected,
    isConnecting,
    isDisconnecting,
    connect,
    disconnect,
  ]);

  return (
    <walletContext.Provider value={state}>
      {children}
    </walletContext.Provider>
  );
}
