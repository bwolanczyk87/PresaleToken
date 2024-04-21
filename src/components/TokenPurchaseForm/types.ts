import { CurrentStageValues } from '@/components/CurrentStageStats/types';

export interface TokenPurchaseModalProps extends CurrentStageValues {
  walletFlrBalance: number;
  walletTokenBalance: number;
}

export interface TokenFormBalancesProps {
  insufficientBalance: boolean;
  totalPriceOfPurchase: number;
  walletFlrBalance: number;
  walletTokenBalance: number;
}
