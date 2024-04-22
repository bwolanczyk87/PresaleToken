import { useContractReads } from 'wagmi';
import { useState, useEffect } from 'react';
import { PresaleContractAbi } from '@/contract/AppBinaryInterfaces';

const useGetCurrentStageStats = (): {
  stage: number;
  stagePrice: number;
  stageSupply: number;
  stageStartTime: number;
  stageEndTime: number;
  stageMinWalletBuy: number;
  stageMaxWalletBuy: number;
  refetchCurrentStageStats: () => void;
} => {
  const [currentStageStats, setCurrentStageStats] = useState<{
    stage: number;
    stagePrice: number;
    stageSupply: number;
    stageStartTime: number;
    stageEndTime: number;
    stageMinWalletBuy: number;
    stageMaxWalletBuy: number;
  }>({
    stage: 1,
    stagePrice: 0,
    stageSupply: 0,
    stageStartTime: 1,
    stageEndTime: 10,
    stageMinWalletBuy: 0,
    stageMaxWalletBuy: 0,
  });

  const preSaleContract = {
    address: process.env.PRESALE_CONTRACT_ADDRESS as `0x${string}` | undefined,
    abi: PresaleContractAbi as any,
  };

  const {
    data: preSaleStageStats,
    isError: errorLoadingStageStats,
    isLoading: loadingStageStats,
    refetch: refetchCurrentStageStats,
  } = useContractReads({
    contracts: [
      {
        ...preSaleContract,
        functionName: 'stage'
      },
      {
        ...preSaleContract,
        functionName: 'stagePrice'
      },
      {
        ...preSaleContract,
        functionName: 'stageSupply'
      },
      {
        ...preSaleContract,
        functionName: 'stageStartTime'
      },
      {
        ...preSaleContract,
        functionName: 'stageEndTime'
      },
      {
        ...preSaleContract,
        functionName: 'stageMinWalletBuy'
      },
      {
        ...preSaleContract,
        functionName: 'stageMaxWalletBuy'
      }
    ],
  });

  useEffect(() => {
    if (loadingStageStats || errorLoadingStageStats || !preSaleStageStats){
      return;
    }

    setCurrentStageStats((prevState) => {
      const [stage, price, supply, start, end, minWalletBuy, maxWalletBuy] = preSaleStageStats as {
        result: number;
        status: string;
      }[];
      if(prevState.stage == undefined) {
        return prevState;
      }

      return {
        ...prevState,
        stage: stage.result,
        stagePrice: parseFloat(price.result.toString()) / 10 ** 6,
        stageSupply: parseFloat(supply.result.toString()),
        stageStartTime: start.result,
        stageEndTime: end.result,
        stageMinWalletBuy: parseFloat(minWalletBuy.result.toString()),
        stageMaxWalletBuy: parseFloat(maxWalletBuy.result.toString())
      };
    });
  }, [loadingStageStats, errorLoadingStageStats, preSaleStageStats]);

  return {
    ...currentStageStats,
    refetchCurrentStageStats,
  };
};

export default useGetCurrentStageStats;
