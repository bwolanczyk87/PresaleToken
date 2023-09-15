import { Button, Text, Image, Modal, Flex, Box, Group, Title } from '@mantine/core';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { useDebounce } from 'usehooks-ts';
import { TokenPurchaseModalProps, ConnectionProgress } from '@/components/Modals/types';
import ModalErrorState from '@/components/Modals/ModalProgressStates/ModalErrorState';
import ModalConnectingState from '@/components/Modals/ModalProgressStates/ModalConnectingState';
import ModalSuccessState from '@/components/Modals/ModalProgressStates/ModalSuccessState';

const ABI = require('@/contract/PresaleContractABI');

const TokenPurchaseModal: React.FC<TokenPurchaseModalProps> = ({
  opened,
  close,
  connectionProgress,
  setConnectionProgress,
  totalPriceOfPurchase,
  tokenAmount,
  walletMaticBalance,
  stageTokenPrice,
}) => {
  const debouncedTokenAmount = useDebounce(tokenAmount, 500);

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS as `0x${string}` | undefined,
    abi: ABI,
    functionName: 'tokenSale',
    args: [BigInt(+tokenAmount * 10 ** 18)],

    value: BigInt(stageTokenPrice * 10 ** 18 * +tokenAmount),
    enabled: Boolean(debouncedTokenAmount),
    chainId: polygonMumbai.id,
  });

  const { data, write, reset } = useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  // reset modal state when modal is closed.
  const handleClose = () => {
    setConnectionProgress(ConnectionProgress.PENDING);
    close();
    reset();
  };

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
      <Title color="white" fw="bold" fz="xl" mb="xl">
        Buy TSTK Tokens
      </Title>
      <Box
        sx={{
          borderRadius: '0.75rem',
          padding: '20px',
          width: '100%',
          backgroundColor: '#25262B',
        }}
      >
        <Text color="white" fw={500}>
          You pay
        </Text>
        <Group position="apart">
          <Text size="1.2rem" fw={600} color="white">
            {totalPriceOfPurchase.toFixed(5)}
          </Text>
          <Flex gap="xs" align="center">
            <Image maw={20} mx="auto" src="/polygon-matic-logo.svg" alt="matic icon" />{' '}
            <Text fw="bold">MATIC</Text>
          </Flex>
        </Group>
        <Group position="right" w="100%" mt=".5rem">
          <Text size="sm">
            Balance: <span>{walletMaticBalance.toFixed(5)}</span>
          </Text>
        </Group>
      </Box>
      <Box
        sx={{
          borderRadius: '0.75rem',
          padding: '20px',
          width: '100%',
          backgroundColor: '#25262B',
          marginTop: '.5rem',
        }}
      >
        <Text color="white" fw={500}>
          You receive
        </Text>
        <Group position="apart">
          <Text size="1.2rem" fw={600} color="white">
            {tokenAmount}
          </Text>
          <Flex gap="xs">
            <Image maw={24} mx="auto" src="/tstk-token-symbol.png" alt="tstk icon" />{' '}
            <Text fw="bold">TSTK</Text>
          </Flex>
        </Group>
        <Group position="right" w="100%" mt=".5rem">
          <Text size="sm">
            1 TSTK = <span>{stageTokenPrice.toFixed(5)}</span> MATIC
          </Text>
        </Group>
      </Box>
      {connectionProgress === ConnectionProgress.PENDING && (
        <Button
          radius="md"
          fullWidth
          size="lg"
          mt="md"
          uppercase
          disabled={!write}
          style={{
            backgroundColor: '#CAFC36',
            color: '#000000',
          }}
          onClick={() => {
            setConnectionProgress(ConnectionProgress.CONNECTING);
            write?.();
          }}
        >
          <Text fz="md">Continue</Text>
        </Button>
      )}

      {/* connection request initiated. Awaiting user approval from extension  */}
      {connectionProgress === ConnectionProgress.CONNECTING &&
        !isLoading &&
        !isSuccess &&
        !isError && (
          <ModalConnectingState connectionRequestText="Please approve this purchase request from your wallet." />
        )}

      {/* request approved by user. processing transaction  */}
      {isLoading && (
        <ModalConnectingState
          titleText="Buying tokens"
          connectionRequestText="Purchasing your awesome tokens."
          isInProgress
        />
      )}

      {/* transaction has an error  */}
      {isError && <ModalErrorState />}

      {/* token purchase was a success  */}
      {isSuccess && !isLoading && (
        <ModalSuccessState
          closeModal={handleClose}
          tokenAmount={tokenAmount}
          transactionHash={data?.hash}
        />
      )}
    </Modal>
  );
};

export default TokenPurchaseModal;
