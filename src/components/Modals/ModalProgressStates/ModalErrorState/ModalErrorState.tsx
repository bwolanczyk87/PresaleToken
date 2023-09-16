import { Text, Image, Flex } from '@mantine/core';

/**
 * Modal section to show an error state when purchasing a token.
 * @returns React node
 */

const ModalErrorState: React.FC = () => (
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
      <Image maw={64} mx="auto" radius="md" src="/error.svg" alt="error icon" />
    </div>
    <Text fz="lg" fw="bold" color="white">
      An error occurred
    </Text>
    <Text align="center">Your request was cancelled or something just did not work.</Text>
  </Flex>
);

export default ModalErrorState;
