import { Flex, Title, Text, Container, Group, Image  } from '@mantine/core';

/**
 * component to show a small welcome text for the WM token
 * @returns React node
 */
const VmBanner: React.FC = () => (
  <Flex h="100%" gap="md" justify="center" align="center" direction="row" wrap="wrap" p="xl">
    <Image mx="auto" radius="md" src="/worm_salute.png" alt="Salute!" />
    <Text mt="lg" mb="xl">
    The nicest little bug on the Internet. He ran straight from the game. Although he is friendly, the environment in which he grew up has left its mark on him. He is often short-tempered because of this.
    </Text>
  </Flex>
);

export default VmBanner;
