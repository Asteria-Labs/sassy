// export const ETHEREUM_URL = process.env.NEXT_PUBLIC_ETHEREUM_URL || `https://${NETWORK}.infura.io/v3/${INFURA_ID}`;
export const ETHEREUM_URL = process.env.NEXT_PUBLIC_ETHEREUM_URL || 'http://127.0.0.1:8545/';

import { Network } from 'alchemy-sdk';
export const ALCHEMY_SETTINGS = {
  apiKey: process.env.ALCHEMY_API_KEY || '',
  network: Network.ETH_MAINNET
}

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Sassy Labs Lodging dApp';

export const NETWORK = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK || 'unknown'; // <-- localhost

export const CHAIN_ID = process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_ID || '1337';

export const FORTMATIC_KEY = process.env.NEXT_PUBLIC_FORTMATIC_KEY || '';

export const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const ERC20_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS || '';

export const WEB3MODAL = {
  THEME: {
    background: '#111',
    main: 'rgb(199, 199, 199)',
    secondary: 'rgb(136, 136, 136)',
    border: 'rgba(195, 195, 195, 0.14)',
    hover: 'rgb(16, 26, 32)',
  },
};

export const MESSAGES = {
  'mint.loading': 'Loading minting data...',
  'mint.confirm': 'Please confirm the transaction to {mintType} mint {quantity} token{pluralSuffix}',
  'mint.pending': '{capitalizedMintType} minting {quantity} token{pluralSuffix}...',
  'mint.success': 'Congratulations! You have successfully {mintType} minted {quantity} token{pluralSuffix}!',
  'mint.error.NOT_WHITELISTED': 'You are not whitelisted',
  'mint.error.TRANSACTION_REPLACED': 'the transaction was either replaced or canceled',
  'mint.error.INSUFFICIENT_FUNDS': 'Please make sure that you have enough balance to mint',
  'mint.error.ACTION_REJECTED': 'You have rejected the transaction',
  'mint.error.INSUFFICIENT_QUANTITY': 'You must mint at least 1 token',
  'mint.error.INSUFFICIENT_SUPPLY': 'You cannot mint more than the remaining supply',
  'mint.error.DEFAULT': 'An error occured. Please try again later',
  'mint.customError.WhitelistForbidden': 'You are not whitelisted',
  'mint.customError.WhitelistConsumed': 'You have consumed your whitelist slots',
  'mint.customError.InsufficientPayment': 'You must pay the correct amount',
} as { [key: string]: string };

// Use human-readable ABI of only used functions and errors to reduce bloat
// See https://docs.ethers.io/v5/api/utils/abi/formats/#abi-formats--human-readable-abi
export const NFT_TOKEN_ABI = [
  'function state() view returns (uint8)',
  'function totalSupply() view returns (uint)',
  'function maxSupply() view returns (uint)',
  'function balanceOf(address) view returns (uint256)',
  'function lodgingPeriod(uint256) view returns (bool,uint256,uint256)',
  'function publicPrice() view returns (uint)',
  'function privatePrice() view returns (uint)',
  'function toggleLodging(uint256[]) public',
  'function mintPublic(uint64 quantity) payable',
  'function mintPrivate(uint64 quantity, uint64 allotted, bytes signature) payable',
  'function mintPrivateMerkle(uint64 quantity, uint64 allotted, bytes32[] proof) payable',
  'error WhitelistForbidden()',
  'error WhitelistConsumed()',
  'error InsufficientPayment()',
];

export const ERC20_TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address _owner) view returns (uint)',
  'function allowance(address _owner, address _spender) view returns (uint)',
  'function approve(address _spender, uint _value) returns (bool)',
];
