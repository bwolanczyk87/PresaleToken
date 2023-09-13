import { Text, Image, Flex } from '@mantine/core';
import { ModalConnectingStateProps } from '@/components/Modals/ModalTypes';

/**
 * Modal section to show state where user is yet to approve Metamask request.
 * @prop connectionRequestText - text to show while awaiting user approval of request
 * @returns React node
 */
const ModalConnectingState: React.FC<ModalConnectingStateProps> = ({ connectionRequestText }) => (
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
    <Text align="center">{connectionRequestText}</Text>
  </Flex>
);

export default ModalConnectingState;
