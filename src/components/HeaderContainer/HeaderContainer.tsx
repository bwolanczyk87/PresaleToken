import { Container, Group, Button, Text, Image } from '@mantine/core';
import { formatAddress } from '@/utils/formatAddress';

const address = '0x0574DB630bb75DBe4310fbd6eB08Dc47048b6fad';

const HeaderContainer: React.FC<{ walletConnected: boolean }> = ({ walletConnected }) => (
  <Container size="sm">
    <Group position="apart">
      <div>
        <Image maw={36} mx="auto" radius="md" src="/brandLogo.png" alt="Random image" />
      </div>
      {!walletConnected && (
        <Button color="lime" radius="md" uppercase>
          <Text fz="md">login with wallet</Text>
        </Button>
      )}
      {walletConnected && (
        <Button variant="light" color="lime" radius="md">
          <Text fz="md">
            <span style={{ color: 'grey' }}>0x</span>
            <span>{formatAddress(address.slice(2), 6, 6)}</span>
          </Text>
        </Button>
      )}
    </Group>
  </Container>
);

export default HeaderContainer;
