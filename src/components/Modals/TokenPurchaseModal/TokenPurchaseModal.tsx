import { Button, Text, Image, Modal, Flex, Box, Group, Title } from '@mantine/core';
import { TokenPurchaseModalProps, ConnectionProgress } from '@/components/Modals/types';
import ModalErrorState from '@/components/Modals/ModalProgressStates/ModalErrorState';
import ModalConnectingState from '@/components/Modals/ModalProgressStates/ModalConnectingState';
import ModalSuccessState from '@/components/Modals/ModalProgressStates/ModalSuccessState';

const TokenPurchaseModal: React.FC<TokenPurchaseModalProps> = ({
  opened,
  close,
  connectionProgress,
  setConnectionProgress,
  totalPriceOfPurchase,
  tokenAmount,
  walletMaticBalance,
  stageTokenPrice,

  retryRequest,
  submitRequest,
}) => (
  <Modal
    opened={opened}
    onClose={close}
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
        style={{
          backgroundColor: '#CAFC36',
          color: '#000000',
        }}
        onClick={() => {
          setConnectionProgress(ConnectionProgress.CONNECTING);

          // TODO: Logic coming soon
          submitRequest();
        }}
      >
        <Text fz="md">Continue</Text>
      </Button>
    )}

    {/* connection request initiated. Awaiting user approval from extension  */}
    {connectionProgress === ConnectionProgress.CONNECTING && (
      <ModalConnectingState connectionRequestText="Please approve this purchase request from your MetaMask extension." />
    )}

    {/* user rejected the connection request  */}
    {(connectionProgress === ConnectionProgress.REJECTED ||
      connectionProgress === ConnectionProgress.ERROR) && (
      <ModalErrorState
        connectionProgress={connectionProgress}
        retryRequest={retryRequest}
        cancelErrorText="You cancelled the purchase request."
      />
    )}

    {/* token purchse was a success  */}
    {connectionProgress === ConnectionProgress.SUCCESS && (
      <ModalSuccessState closeModal={close} tokenAmount={tokenAmount} />
    )}
  </Modal>
);

export default TokenPurchaseModal;
