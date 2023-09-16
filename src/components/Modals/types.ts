import { Dispatch, SetStateAction } from 'react';

export enum ConnectionProgress {
  NOT_STARTED = 'NOT_STARTED',
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

export interface ModalConnectingStateProps {
  isInProgress?: boolean;
  titleText?: string;
  connectionRequestText: string;
}

export interface ModalSuccessStateProps {
  transactionHash?: string;
  closeModal: () => void;
  tokenAmount: string;
}

export interface ModalPurchaseDetailsProps {
  tokenAmount: string;
  stageTokenPrice: number;
  totalPriceOfPurchase: number;
  walletMaticBalance: number;
}
