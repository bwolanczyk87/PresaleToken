import { Dispatch, SetStateAction } from 'react';
import { Button, Text, Image, Modal, Flex, ActionIcon } from '@mantine/core';
import { IconRotateClockwise } from '@tabler/icons-react';

export enum ConnectionProgress {
  PENDING = 'PENDING',
  CONNECTING = 'CONNECTING',
  REJECTED = 'REJECTED',
}

interface WalletConnectModalProps {
  connectionProgress: ConnectionProgress;
  setConnectionProgress: Dispatch<SetStateAction<ConnectionProgress>>;
  opened: boolean;
  close: () => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  opened,
  close,
  connectionProgress,
  setConnectionProgress,
}) => (
  <Modal opened={opened} onClose={close} withCloseButton={false} centered size="sm" radius="lg" padding="xl">
    {/* user is yet to select a wallet option  */}
    {connectionProgress === ConnectionProgress.PENDING && (
      <>
        <Text color="white" fw="bold" fz="xl">
          Connect wallet
        </Text>
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
          onClick={() => setConnectionProgress(ConnectionProgress.CONNECTING)}
        />
      </>
    )}

    {/* connection request initiated. Awaiting user approval from extension  */}
    {connectionProgress === ConnectionProgress.CONNECTING && (
      <>
        <Text color="white" fw="bold" fz="xl" align="center">
          MetaMask
        </Text>
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
    {connectionProgress === ConnectionProgress.REJECTED && (
      <>
        <Text color="white" fw="bold" fz="xl" align="center">
          MetaMask
        </Text>
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: '3px solid red',
              padding: '10px',
              width: '6.25rem',
              height: '6.25rem',
            }}
          >
            {' '}
            <Image maw={64} mx="auto" radius="md" src="/metamaskIcon.svg" alt="metamask icon" />
          </div>
          <Text fz="lg" fw="bold" color="white">
            Request cancelled
          </Text>
          <Text align="center">
            You cancelled the request.
            <br /> Click below to retry
          </Text>

          <ActionIcon size="xl" radius="xl" variant="filled">
            <IconRotateClockwise size="2.125rem" />
          </ActionIcon>
        </Flex>
      </>
    )}
  </Modal>
);

export default WalletConnectModal;
