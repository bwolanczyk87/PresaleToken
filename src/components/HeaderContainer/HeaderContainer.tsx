import { Container, Group, Button, Text, Image, Menu } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { formatAddress } from '@/utils/formatAddress';

const address = '0x0574DB630bb75DBe4310fbd6eB08Dc47048b6fad';

const HeaderContainer: React.FC<{ walletConnected: boolean }> = ({ walletConnected }) => (
  <Container size="sm">
    <Group position="apart">
      <div>
        <Image maw={36} mx="auto" radius="md" src="/brandLogo.png" alt="Random image" />
      </div>
      {!walletConnected && (
        <Button
          radius="lg"
          uppercase
          style={{
            backgroundColor: '#CAFC36',
            color: '#000000',
          }}
        >
          <Text fz="md">login with wallet</Text>
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
);

export default HeaderContainer;
