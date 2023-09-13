import { Button, Text, Image, Modal, Flex, Title } from '@mantine/core';
import { ConnectionProgress, WalletConnectModalProps } from '@/components/Modals/ModalTypes';
import ModalErrorState from '@/components/Modals/ModalProgressStates/ModalErrorState';

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  opened,
  close,
  connectionProgress,
  setConnectionProgress,

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
    {/* user is yet to select a wallet option  */}
    {connectionProgress === ConnectionProgress.PENDING && (
      <>
        <Title color="white" fw="bold" fz="xl">
          Connect wallet
        </Title>
        <Text mb="xl">Connect your wallet to purchase tokens.</Text>
        <Button
          variant="default"
          size="lg"
          fullWidth
          leftIcon={<Text fz="lg">MetaMask</Text>}
          rightIcon={
            <Image maw={36} mx="auto" radius="md" src="/metamaskIcon.svg" alt="metamask icon" />
          }
          styles={{
            inner: {
              justifyContent: 'space-between',
            },
          }}
          onClick={() => {
            setConnectionProgress(ConnectionProgress.CONNECTING);

            //TODO: Add wallet connection request here
            submitRequest();
          }}
        />
      </>
    )}

    {/* connection request initiated. Awaiting user approval from extension  */}
    {connectionProgress === ConnectionProgress.CONNECTING && (
      <>
        <Title color="white" fw="bold" fz="xl" align="center">
          MetaMask
        </Title>
        <Flex
          mih={50}
          gap="md"
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
          mt="xl"
        >
          <div
            style={{
              position: 'relative',
            }}
          >
            <Image maw={100} mx="auto" radius="md" src="/spinner.svg" alt="spinner icon" />
            <Image
              maw={64}
              mx="auto"
              radius="md"
              src="/metamaskIcon.svg"
              alt="metamask icon"
              styles={{
                root: {
                  position: 'absolute',
                  inset: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}
            />
          </div>
          <Text fz="lg" fw="bold" color="white">
            Requesting connection
          </Text>
          <Text align="center">Please approve the request from your MetaMask extension</Text>
        </Flex>
      </>
    )}

    {/* user rejected the connection request  */}
    {(connectionProgress === ConnectionProgress.REJECTED ||
      connectionProgress === ConnectionProgress.ERROR) && (
      <>
        <Title color="white" fw="bold" fz="xl" align="center">
          MetaMask
        </Title>
        <ModalErrorState
          connectionProgress={connectionProgress}
          retryRequest={retryRequest}
          cancelErrorText="You cancelled the connection request."
          isWalletConnectionRequest
        />
      </>
    )}
  </Modal>
);

export default WalletConnectModal;
