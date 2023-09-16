import { CurrentStageValues } from '@/components/CurrentStageStats/types';

export interface TokenPurchaseModalProps extends CurrentStageValues {
  walletMaticBalance: number;
  walletTokenBalance: number;
}

export interface TokenFormBalancesProps {
  insufficientBalance: boolean;
  totalPriceOfPurchase: number;
  walletMaticBalance: number;
  walletTokenBalance: number;
}
