import { Dispatch, SetStateAction } from 'react';

export enum ConnectionProgress {
  PENDING = 'PENDING',
  CONNECTING = 'CONNECTING',
  REJECTED = 'REJECTED',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface WalletConnectModalProps {
  connectionProgress: ConnectionProgress;
  setConnectionProgress: Dispatch<SetStateAction<ConnectionProgress>>;
  opened: boolean;
  close: () => void;
  retryRequest: () => void;
  submitRequest: () => void;
}

export interface TokenPurchaseModalProps extends WalletConnectModalProps {
  tokenAmount: string;
  stageTokenPrice: number;
  totalPriceOfPurchase: number;
  walletMaticBalance: number;
}

export interface ModalErrorStateProps {
  connectionProgress: ConnectionProgress;
  retryRequest: () => void;
  cancelErrorText: string;
  isWalletConnectionRequest?: boolean;
}
