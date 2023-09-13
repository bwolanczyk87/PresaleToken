import { Container, Group, Button, Text, Image, Menu } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { formatAddress } from '@/utils/formatAddress';
import WalletConnectModal from '@/components/Modals/WalletConnectionModal/WalletConnectModal';
import { ConnectionProgress } from '@/components/Modals/ModalTypes';

const address = '0x0574DB630bb75DBe4310fbd6eB08Dc47048b6fad';

const HeaderContainer: React.FC<{ walletConnected: boolean }> = ({ walletConnected }) => {
  const [connectionProgress, setConnectionProgress] = useState<ConnectionProgress>(
    ConnectionProgress.CONNECTING
  );
  const [opened, { open, close }] = useDisclosure(false);

  //TODO: submit wallet connection request
  const submitConnectionRequest = () => {
    console.log('Now connecting to wallet');
  };

  // TODO: retry wallet connection
  const retryWalletConnection = () => {
    setConnectionProgress(ConnectionProgress.CONNECTING);
    console.log('Retrying wallet connection');
  };

  return (
    <div>
      <Container size="lg">
        <Group position="apart">
          <div>
            <Image maw={36} mx="auto" radius="md" src="/brandLogo.png" alt="brand logo" />
          </div>
          {!walletConnected && (
            <Button
              radius="md"
              uppercase
              style={{
                backgroundColor: '#CAFC36',
                color: '#000000',
              }}
              onClick={open}
            >
              <Text fz="md">Connect wallet</Text>
            </Button>
          )}
          {walletConnected && (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="light" color="lime" radius="lg">
                  <Text fz="md">
                    <span style={{ color: 'grey' }}>0x</span>
                    <span>{formatAddress(address.slice(2), 6, 6)}</span>
                  </Text>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<IconLogout size={14} />}>Disconnect account</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Container>

      <WalletConnectModal
        opened={opened}
        close={close}
        connectionProgress={connectionProgress}
        setConnectionProgress={setConnectionProgress}
        retryRequest={retryWalletConnection}
        submitRequest={submitConnectionRequest}
      />
    </div>
  );
};

export default HeaderContainer;
