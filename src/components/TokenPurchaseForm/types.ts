import { CurrentStageValues } from '@/components/CurrentStageStats/types';

export interface TokenPurchaseModalProps extends CurrentStageValues {
  walletMaticBalance: number;
  walletTokenBalance: number;
}
