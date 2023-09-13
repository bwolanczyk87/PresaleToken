import { Dispatch, SetStateAction } from 'react';

export enum ConnectionProgress {
  PENDING = 'PENDING',
  CONNECTING = 'CONNECTING',
  REJECTED = 'REJECTED',
  // TODO: add modal state
  ERROR = 'ERROR',
}

export interface WalletConnectModalProps {
  connectionProgress: ConnectionProgress;
  setConnectionProgress: Dispatch<SetStateAction<ConnectionProgress>>;
  opened: boolean;
  close: () => void;
}

export interface TokenPurchaseModalProps extends WalletConnectModalProps {
  tokenAmount: string;
  stageTokenPrice: number;
  totalPriceOfPurchase: number;
  walletMaticBalance: number;
}
