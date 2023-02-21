import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { ethers } from 'ethers';
import { Contract, Provider } from 'ethers-multicall';

import useWallet from './useWallet';
import { CHAIN_ID, NFT_CONTRACT_ADDRESS, NFT_TOKEN_ABI } from '../config';

const contractInterface = new ethers.utils.Interface(NFT_TOKEN_ABI);

export default function useNftContract() {
  const { address, provider, readOnlyProvider, signer } = useWallet();

  const [state, setState] = useState<number>();
  const [totalSupply, setTotalSupply] = useState<number>();
  const [maxSupply, setMaxSupply] = useState<number>();
  const [balanceOf, setBalanceOf] = useState<number>();
  const [publicPrice, setPublicPrice] = useState<string>();
  const [privatePrice, setPrivatePrice] = useState<string>();

  const nftContract = useMemo(
    () => new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      contractInterface,
      signer,
    ),
    [signer],
  );

  const multicallProvider = useMemo(
    () => {
      const innerProvider: ethers.providers.Provider | undefined = provider || readOnlyProvider;
      return innerProvider
        ? new Provider(readOnlyProvider as ethers.providers.Provider, parseInt(CHAIN_ID, 10))
        : undefined;
    },
    [provider, readOnlyProvider]
    ,
  );

  const multicallNftContract = useMemo(
    () => new Contract(
      NFT_CONTRACT_ADDRESS,
      contractInterface.fragments as Array<ethers.utils.Fragment>,
    ),
    [],
  );

  const reload = useCallback(async () => {
    if (!multicallProvider) return undefined;

    const [
      state,
      totalSupply,
      maxSupply,
      balanceOf,
      publicPrice,
      privatePrice,
    ] = await multicallProvider.all([
      multicallNftContract.state(),
      multicallNftContract.totalSupply(),
      multicallNftContract.maxSupply(),
      multicallNftContract.balanceOf(address),
      multicallNftContract.publicPrice(),
      multicallNftContract.privatePrice(),
    ]);

    const formattedPayload = {
      state: ethers.BigNumber.isBigNumber(state) ? state.toNumber() : state,
      totalSupply: ethers.BigNumber.isBigNumber(totalSupply) ? totalSupply.toNumber() : totalSupply,
      maxSupply: ethers.BigNumber.isBigNumber(maxSupply) ? maxSupply.toNumber() : maxSupply,
      balanceOf: ethers.BigNumber.isBigNumber(balanceOf) ? balanceOf.toNumber() : balanceOf,
      publicPrice: ethers.utils.formatEther(publicPrice),
      privatePrice: ethers.utils.formatEther(privatePrice),
    };

    setState(formattedPayload.state);
    setTotalSupply(formattedPayload.totalSupply);
    setMaxSupply(formattedPayload.maxSupply);
    setBalanceOf(formattedPayload.balanceOf);
    setPublicPrice(formattedPayload.publicPrice);
    setPrivatePrice(formattedPayload.privatePrice);

    return formattedPayload;
  }, [multicallNftContract, multicallProvider]);

  useEffect(() => {
    reload();
  }, [nftContract, reload]);

  return {
    nftContract, state, totalSupply, maxSupply, balanceOf, publicPrice, privatePrice, reload,
  };
}
