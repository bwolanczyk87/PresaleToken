import { Container, Group, Image } from '@mantine/core';
import WalletConnectButton from '@/components/WalletConnectButton/WalletConnectButton';

const HeaderContainer: React.FC<{ walletConnected: boolean }> = () => (
  <div>
    <Container size="lg">
      <Group position="apart">
        <div>
          <Image maw={36} mx="auto" radius="md" src="/brandLogo.png" alt="brand logo" />
        </div>
        <WalletConnectButton />
      </Group>
    </Container>
  </div>
);

export default HeaderContainer;
