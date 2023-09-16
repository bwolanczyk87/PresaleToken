import { Text, Image, Flex } from '@mantine/core';
import { ModalConnectingStateProps } from '@/components/Modals/types';

/**
 * Modal section to show state where user is yet to approve transaction request.
 * @prop titleText - Text to show as title
 * @prop connectionRequestText - text to show while awaiting user approval of request
 * @props isInProgress - whether to show an in progress state
 * @returns React node
 */
const ModalConnectingState: React.FC<ModalConnectingStateProps> = ({
  connectionRequestText,
  titleText = 'Requesting connection',
  isInProgress = false,
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
        position: 'relative',
      }}
    >
      <Image maw={100} mx="auto" radius="md" src="/spinner.svg" alt="spinner icon" />
      <Image
        maw={64}
        mx="auto"
        radius="md"
        src={isInProgress ? '/inProgress.svg' : '/walletApprove.svg'}
        alt="icon"
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
      {titleText}
    </Text>
    <Text align="center">{connectionRequestText}</Text>
  </Flex>
);

export default ModalConnectingState;
