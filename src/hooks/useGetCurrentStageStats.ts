import { useContractReads, usePublicClient } from 'wagmi';
import { useState, useEffect } from 'react';
import { ABI } from '@/contract/PresaleContractABI';

/**
 * Hook to get current stage details as follows:
 * 1. stageTokenPrice - token price for the current stage
 * 2. stageTokenSupply - amount of tokens that are available for purchase in the stage
 * 3. currentStage - current stage number
 * 5. currentStageBlockStart - block number at which current stage started
 * 6. currentStageStartTime - timestamp of the current stage start block
 * 7. maxTokensPerStage - Maximum tokens a wallet can purchase per stage
 * 8. refetchCurrentStageStats - function to refetch the above details
 * @returns
 */
const useGetCurrentStageStats = (): {
  stageTokenPrice: number;
  stageTokenSupply: number;
  currentStage: number;
  currentStageBlockStart: number;
  currentStageStartTime: BigInt;
  maxTokensPerStage: number;
  refetchCurrentStageStats: () => void;
} => {
  const [currentStageStats, setCurrentStageStats] = useState<{
    stageTokenPrice: number;
    stageTokenSupply: number;
    currentStage: number;
    currentStageBlockStart: number;
    maxTokensPerStage: number;
  }>({
    stageTokenPrice: 0.0000064,
    stageTokenSupply: 1000000000000,
    currentStage: 1,
    currentStageBlockStart: 22843780 /*0 - disable clock if not set */,
    maxTokensPerStage: 1000000000000,
  });
  const [currentStageStartTime, setCurrentStageStartTime] = useState<BigInt>(BigInt(0));

  const publicClient = usePublicClient();

  // contract calls to get stage details
  const preSaleContract = {
    address: "0xC15167Cef1a6584A5d91A95E2070C800A157A2f2" as `0x${string}` | undefined,
    abi: ABI as any,
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
        functionName: 'currentStagePrice',
        
      },
      {
        ...preSaleContract,
        functionName: 'currentStage',
      },
      {
        ...preSaleContract,
        functionName: 'currentStageAvailableAmount',
      },
      {
        ...preSaleContract,
        functionName: 'currentStageBlockStart',
      },
      {
        ...preSaleContract,
        functionName: 'STAGE_MAX_WALLET_BUY',
      },
    ],
  });

  useEffect(() => {
    if (loadingStageStats || errorLoadingStageStats || !preSaleStageStats){
      return;
    }

    setCurrentStageStats((prevState) => {
      const [price, stage, supply, block, maxPerWallet] = preSaleStageStats as {
        result: number;
        status: string;
      }[];
      console.log(block.result)
      return {
        ...prevState,
        stageTokenPrice: parseFloat(price.result.toString()) / 10 ** 18,
        stageTokenSupply: parseFloat(supply.result.toString()), // / 10 ** 18,
        currentStage: stage.result,
        currentStageBlockStart: block.result,
        maxTokensPerStage: parseFloat(maxPerWallet.result.toString()), // / 10 ** 18,
      };
    });
  }, [loadingStageStats, errorLoadingStageStats, preSaleStageStats]);


  // get the timestamp of the current stage start block
  useEffect(() => {
    if (!currentStageStats.currentStageBlockStart) return;
    publicClient
      .getBlock({
        blockNumber: BigInt(currentStageStats.currentStageBlockStart),
      })
      .then((blockDetails) => setCurrentStageStartTime(blockDetails.timestamp))
      .catch((error) => console.log(error));
  }, [currentStageStats.currentStageBlockStart, publicClient]);


  return {
    ...currentStageStats,
    currentStageStartTime,
    refetchCurrentStageStats,
  };
};

export default useGetCurrentStageStats;
