import { CurrentStageValues } from '@/components/CurrentStageStats/types';

export interface TokenPurchaseModalProps extends CurrentStageValues {
  walletBalance: number;
  walletTokenBalance: number;
}

export interface TokenFormBalancesProps {
  insufficientBalance: boolean;
  stagePrice: number;
  saleTokenAmount: number;
  walletBalance: number;
  walletTokenBalance: number;
}
