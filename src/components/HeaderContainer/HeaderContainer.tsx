import { Container, Group, Button, Text, Image, Menu, Flex, ActionIcon } from '@mantine/core';
import { IconLogout, IconRotateClockwise } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { formatAddress } from '@/utils/formatAddress';
import AppModal from '@/components/Modals/Modal';

const address = '0x0574DB630bb75DBe4310fbd6eB08Dc47048b6fad';

enum ConnectionProgress {
  PENDING = 'PENDING',
  CONNECTING = 'CONNECTING',
  REJECTED = 'REJECTED',
}

const HeaderContainer: React.FC<{ walletConnected: boolean }> = ({ walletConnected }) => {
  const [connectionProgress, setConnectionProgress] = useState<ConnectionProgress>(
    ConnectionProgress.REJECTED
  );
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
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
              onClick={open}
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
      <AppModal opened={opened} close={close}>
        {connectionProgress === ConnectionProgress.PENDING && (
          <>
            <Text color="white" fw="bold" fz="xl">
              Connect wallet
            </Text>
            <Text mb="xl">Connect your wallet to purchase tokens.</Text>
            <Button
              variant="default"
              size="lg"
              fullWidth
              leftIcon={<Text fz="lg">MetaMask</Text>}
              rightIcon={
                <Image maw={36} mx="auto" radius="md" src="/metamaskIcon.svg" alt="metamask icon" />
              }
              styles={{
                inner: {
                  justifyContent: 'space-between',
                },
              }}
              onClick={() => setConnectionProgress(ConnectionProgress.CONNECTING)}
            />
          </>
        )}

        {connectionProgress === ConnectionProgress.CONNECTING && (
          <>
            <Text color="white" fw="bold" fz="xl" align="center">
              MetaMask
            </Text>
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
              <Text align="center">Please approve the request from your MetaMask extension</Text>
            </Flex>
          </>
        )}

        {connectionProgress === ConnectionProgress.REJECTED && (
          <>
            <Text color="white" fw="bold" fz="xl" align="center">
              MetaMask
            </Text>
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
                <Image maw={64} mx="auto" radius="md" src="/metamaskIcon.svg" alt="metamask icon" />
              </div>
              <Text fz="lg" fw="bold" color="white">
                Request cancelled
              </Text>
              <Text align="center">
                You cancelled the request.
                <br /> Click below to retry
              </Text>

              <ActionIcon size="xl" radius="xl" variant="filled">
                <IconRotateClockwise size="2.125rem" />
              </ActionIcon>
            </Flex>
          </>
        )}
      </AppModal>
    </div>
  );
};

export default HeaderContainer;
