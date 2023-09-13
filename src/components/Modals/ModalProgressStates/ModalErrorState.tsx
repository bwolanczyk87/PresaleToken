import { Text, Image, Flex, ActionIcon, Anchor } from '@mantine/core';
import { IconRotateClockwise } from '@tabler/icons-react';
import { ConnectionProgress, ModalErrorStateProps } from '@/components/Modals/ModalTypes';

/**
 * Modal section to show an error state when connecting wallet or
 * purchasing a token.
 * @prop connectionProgress - state to indicate the error state
 * @prop retryRequest - function to retry the failed request
 * @prop cancelErrorText - Error text to show when request is cancelled
 * @prop isWalletConnectionRequest - whether the request is from a wallet connection
 * @returns React node
 */

const ModalErrorState: React.FC<ModalErrorStateProps> = ({
  connectionProgress,
  retryRequest,
  cancelErrorText,
  isWalletConnectionRequest = false,
}) => (
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
      {connectionProgress === ConnectionProgress.ERROR ? 'An error occured' : 'Request cancelled'}
    </Text>
    <Text align="center">
      {connectionProgress === ConnectionProgress.ERROR
        ? 'There was a problem with the request.'
        : cancelErrorText}
      <br /> Click below to retry
    </Text>

    {/* show link to etherscan contract call for error cases  */}
    {connectionProgress === ConnectionProgress.ERROR && !isWalletConnectionRequest && (
      <Anchor href="https://mantine.dev/" target="_blank">
        View on Polygonscan
      </Anchor>
    )}

    <ActionIcon size="xl" radius="xl" variant="filled" onClick={retryRequest}>
      <IconRotateClockwise size="2.125rem" />
    </ActionIcon>
  </Flex>
);

export default ModalErrorState;
