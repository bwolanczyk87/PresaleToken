import { AppShell, Header, Center, Flex } from '@mantine/core';
import HeaderContainer from '@/components/HeaderContainer/HeaderContainer';

export default function HomePage() {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <HeaderContainer walletConnected={false} />
        </Header>
      }
    >
      {/* Your application here */}

      <Center maw={500} h={100} mx="auto">
        <Flex mih={50} gap="xl" justify="flex-start" align="center" direction="column" wrap="wrap">
          <div>TSTX Presale</div>
          <div>Presale Countdown</div>
          <div>TSTX stats like tokens remaining, current stage, and token price</div>

          <div>Connect button (if not connected)</div>
          <div> input + button to buy token (if connected)</div>
          <div> User holdings</div>
        </Flex>
      </Center>
    </AppShell>
  );
}
