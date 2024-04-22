import { Button, Text, Modal } from '@mantine/core';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useEffect, useState } from 'react';
import { flare } from 'wagmi/chains';
import { useDebounce } from 'usehooks-ts';
import { TokenPurchaseModalProps, ConnectionProgress } from '@/components/Modals/types';
import ModalErrorState from '@/components/Modals/ModalProgressStates/ModalErrorState/ModalErrorState';
import ModalConnectingState from '@/components/Modals/ModalProgressStates/ModalConnectingState/ModalConnectingState';
import ModalSuccessState from '@/components/Modals/ModalProgressStates/ModalSuccessState/ModalSuccessState';
import ModalPurchaseDetails from '@/components/Modals/ModalProgressStates/ModalPurchaseDetails/ModalPurchaseDetails';
import useGetAccountBalances from '@/hooks/useGetAccountBalances';
import useGetCurrentStageStats from '@/hooks/useGetCurrentStageStats';
import { PresaleContractAbi, TokenContractAbi } from '@/contract/AppBinaryInterfaces';
import { useContractReads } from 'wagmi';

/**
 * Modal to show progress of the token purchase
 * @prop opened - boolean state to open modal
 * @prop close - function to close modal
 * @prop connectionProgress - progress of transaction request
 * @prop setConnectionProgress - change the progress state of the transaction
 * @prop saleTokenAmount - total price to purchase given amount of tokens
 * @prop saleTokenQuantity - amount of tokens to purchase
 * @prop walletBalance - Flr balance of the current account
 * @prop stagePrice - price of one token for the current stage.
 * @returns
 */

const TokenPurchaseModal: React.FC<TokenPurchaseModalProps> = ({
  opened,
  close,
  connectionProgress,
  setConnectionProgress,
  saleTokenAmount,
  saleTokenQuantity,
  walletBalance,
  stagePrice,
}) => {
  const tokenContract = {
    address: process.env.TOKEN_ADDRESS as `0x${string}` | undefined,
    abi: TokenContractAbi as any
  };

  const presaleContract = {
    address: process.env.PRESALE_CONTRACT_ADDRESS as `0x${string}` | undefined,
    abi: PresaleContractAbi as any
  };

  // const {
  //   data: tokenData,
  //   isError: errorLoadingStageStats,
  //   isLoading: loadingStageStats
  // } = useContractReads({
  //   contracts: [
  //     {
  //       ...tokenContract,
  //       functionName: 'decimal'
  //     }
  //   ]
  // });

  const decimal = 6;
  const buyTokenQuantity = stagePrice == 0 ? 0 : +saleTokenQuantity / (stagePrice/decimal);
  const buyTokenQuantityRounded = buyTokenQuantity < 0 ? 0 : Math.round(buyTokenQuantity); 
  const saleTokenAmountRounded = saleTokenAmount < 0 ? 0 : Math.round(saleTokenAmount);

  const { config } = usePrepareContractWrite({
    ...presaleContract,
    functionName: 'saleToken',
    args: [ BigInt(buyTokenQuantityRounded) ],
    value: BigInt(saleTokenAmountRounded),
    enabled: Boolean(useDebounce(saleTokenQuantity, 500)),
    chainId: flare.id,
  });

  const { data, write, reset, isError: writeError } = useContractWrite(config);
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  // reset modal state when modal is closed.
  const handleClose = () => {
    setConnectionProgress(ConnectionProgress.NOT_STARTED);
    close();
    reset();
  };

  // show wallet approval state and initiate write
  const handleWriteContract = () => {
    setConnectionProgress(ConnectionProgress.PENDING);
    write?.();
  };

  const { refetchFlrBalance, refetchTokenBalance } = useGetAccountBalances();
  const { refetchCurrentStageStats } = useGetCurrentStageStats();
  // show different modal states based on status of transaction
  useEffect(() => {
    if (isLoading && !isError && !writeError) {
      setConnectionProgress(ConnectionProgress.CONNECTING);
    } else if (isError || writeError) {
      setConnectionProgress(ConnectionProgress.ERROR);
    } else if (isSuccess) {
      setConnectionProgress(ConnectionProgress.SUCCESS);

      // refetch account balances
      refetchFlrBalance();
      refetchTokenBalance();

      // refetch stage stats
      refetchCurrentStageStats();
    } else {
      setConnectionProgress(ConnectionProgress.NOT_STARTED);
    }
  }, [isLoading, isSuccess, isError, writeError]);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      centered
      size="sm"
      radius="lg"
      padding="xl"
    >
      {/* token and price details to show to the user  */}
      <ModalPurchaseDetails
        saleTokenQuantity={saleTokenQuantity}
        walletBalance={walletBalance}
        stagePrice={stagePrice}
        saleTokenAmount={saleTokenAmount}
      />
      {connectionProgress === ConnectionProgress.NOT_STARTED && (
        <Button
          radius="md"
          fullWidth
          size="lg"
          mt="md"
          uppercase
          disabled={false}//{!write}
          style={{
            backgroundColor: '#CAFC36',
            color: '#000000',
          }}
          onClick={handleWriteContract}
        >
          <Text fz="md">Continue</Text>
        </Button>
      )}

      {/* connection request initiated. awaiting user approval from extension  */}
      {connectionProgress === ConnectionProgress.PENDING &&
        !isLoading &&
        !isSuccess &&
        !isError && (
          <ModalConnectingState connectionRequestText="Please approve this purchase request from your wallet." />
        )}

      {/* request approved by user. processing transaction  */}
      {connectionProgress === ConnectionProgress.CONNECTING && (
        <ModalConnectingState
          titleText="Buying tokens"
          connectionRequestText="Purchasing your awesome tokens."
          isInProgress
        />
      )}

      {/* transaction has an error  */}
      {connectionProgress === ConnectionProgress.ERROR && <ModalErrorState />}

      {/* token purchase was a success  */}
      {connectionProgress === ConnectionProgress.SUCCESS && (
        <ModalSuccessState
          closeModal={handleClose}
          saleTokenQuantity={saleTokenQuantity}
          transactionHash={data?.hash}
        />
      )}
    </Modal>
  );
};

export default TokenPurchaseModal;
