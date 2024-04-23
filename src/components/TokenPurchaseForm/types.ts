import { CurrentStageValues } from '@/components/CurrentStageStats/types';

export interface TokenPurchaseModalProps extends CurrentStageValues {
  walletCurrencyBalance: number;
  walletTokenBalance: number;
}

export interface TokenFormBalancesProps {
  insufficientBalance: boolean;
  purchaseAmount: number;
  purchasePrice: number;
  walletCurrencyBalance: number;
  walletTokenBalance: number;
}
