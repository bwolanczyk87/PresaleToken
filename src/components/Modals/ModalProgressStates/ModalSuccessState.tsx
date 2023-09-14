import { Text, Image, Flex, Anchor, Button } from '@mantine/core';
import { ModalSuccessStateProps } from '@/components/Modals/types';

/**
 * Modal section to show success upon token purchase
 * @prop closeModal - function to close the modal
 * @prop tokenAmount - amount of tokens purchased
 * @returns React node
 */
const ModalSuccessState: React.FC<ModalSuccessStateProps> = ({ closeModal, tokenAmount }) => (
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
        border: '3px solid #CAFC36',
        padding: '10px',
        width: '6.25rem',
        height: '6.25rem',
      }}
    >
      {' '}
      <Image maw={64} mx="auto" radius="md" src="/metamaskIcon.svg" alt="metamask icon" />
    </div>
    <Text fz="lg" fw="bold" color="white">
      Request successful
    </Text>
    <Text align="center">You just purchased {tokenAmount} TSTK tokens.</Text>

    {/* show link to etherscan contract call for confirmation  */}
    <Anchor href="https://mantine.dev/" target="_blank">
      View on Polygonscan
    </Anchor>

    <Button
      radius="md"
      uppercase
      fullWidth
      style={{
        backgroundColor: '#CAFC36',
        color: '#000000',
      }}
      onClick={closeModal}
    >
      <Text fz="md">Close</Text>
    </Button>
  </Flex>
);

export default ModalSuccessState;
