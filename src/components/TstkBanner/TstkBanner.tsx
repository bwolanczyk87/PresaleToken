import { Flex, Title, Text } from '@mantine/core';

/**
 * component to show a small welcome text for the TSTK token
 * @returns React node
 */
const TstkBanner: React.FC = () => (
  <Flex h="100%" gap="md" justify="center" align="center" direction="column" wrap="wrap" p="xl">
    <Title
      order={1}
      size="h1"
      color="white"
      style={{
        fontSize: '3.5rem',
      }}
    >
      <span>Buy </span>
      <span
        style={{
          color: 'rgb(147 51 234)',
        }}
      >
        TSTK
      </span>{' '}
      <span>Now, to Get Rich In The Future</span>
    </Title>
    <Text mt="lg" mb="xl">
      TSTK is not just a DeFi token, it is the best DeFi token that you can invest in right now!
    </Text>
  </Flex>
);

export default TstkBanner;
