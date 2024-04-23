import { AppShell, Header, Flex, Text, Container, Grid } from '@mantine/core';
import HeaderContainer from '@/components/HeaderContainer/HeaderContainer';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import CurrentStageStats from '@/components/CurrentStageStats/CurrentStageStats';
import TokenPurchaseForm from '@/components/TokenPurchaseForm/TokenPurchaseForm';
import VmBanner from '@/components/VmBanner/VmBanner';
import useGetCurrentStageStats from '@/hooks/useGetCurrentStageStats';
import useGetAccountBalances from '@/hooks/useGetAccountBalances';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const {
    stage,
    stagePrice,
    stageSupply,
    stageStartTime,
    stageEndTime,
    stageMinWalletBuy,
    stageMaxWalletBuy
  } = useGetCurrentStageStats();

  const { walletBalance, tokenBalance } = useGetAccountBalances();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
      setIsClient(true);
  }, []);

  return (
    <AppShell
      padding="md"
      fixed={false}
      style={{
        height: '100vh',
      }}
      header={
        <Header height={36} p="lg">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"></link>
          <HeaderContainer />
        </Header>
      }
    >
          <Text mt="lg" mb="xl" style={{ 
            
            textAlign: 'center',
            fontSize: 30,
            paddingLeft: 100,
            paddingRight: 100,
            paddingTop: 30,
            paddingBottom: 0 }}>
    I am Worm memcoin on the Flare blockchain. 
    I want to become the biggest and most popular of all worms.

Help me with this. Help yourself.
    </Text>
      <Container size="lg" pt="xl">
        <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={120}>
          <Grid.Col xs={12} sm={6}>
            <VmBanner />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
              p="xl"
              style={{
                borderRadius: '0.75rem',
                backgroundColor: '#28320E',
              }}
            >
              {/* Countdown timer  */}
              <Text mb="sm" align="left" size="1.3rem" w="100%" color="white" fw="bold">
                Presale Stage #{stage.toString()} Ends In:
              </Text>
              <CountdownTimer stageStartTime={stageStartTime} />

              {/* stats about current stage  */}
              <CurrentStageStats
                stage={stage}
                stagePrice={stagePrice}
                stageSupply={stageSupply}
                stageMinWalletBuy={stageMinWalletBuy}
                stageMaxWalletBuy={stageMaxWalletBuy}
              />

              {/* form with input and submit button along with transaction modal */}
              <TokenPurchaseForm
                stagePrice={stagePrice}
                stageSupply={stageSupply}
                stageMinWalletBuy={stageMinWalletBuy}
                stageMaxWalletBuy={stageMaxWalletBuy}
                walletBalance={walletBalance}
                walletTokenBalance={tokenBalance}
              />
            </Flex>
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell>
  );
}
