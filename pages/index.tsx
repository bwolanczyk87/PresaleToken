import { AppShell, Header, Flex, Text, Container, Grid } from '@mantine/core';
import HeaderContainer from '@/components/HeaderContainer/HeaderContainer';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import CurrentStageStats from '@/components/CurrentStageStats/CurrentStageStats';
import TokenPurchaseForm from '@/components/TokenPurchaseForm/TokenPurchaseForm';
import VmBanner from '@/components/VmBanner/VmBanner';
import useGetCurrentStageStats from '@/hooks/useGetCurrentStageStats';
import useGetAccountBalances from '@/hooks/useGetAccountBalances';
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('../pages/index'), { ssr: false })

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const {
    currentStage,
    currentStageStartTime,
    stageTokenPrice,
    stageTokenSupply,
    maxTokensPerStage,
  } = useGetCurrentStageStats();

  const { maticBalance, tokenBalance } = useGetAccountBalances();

 


  return (
    <AppShell
      padding="md"
      fixed={false}
      style={{
        height: '100vh',
      }}
      header={
        <Header height={80} p="lg">
          <HeaderContainer />
        </Header>
      }
    >
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
                Presale Stage #{currentStage.toString()} Ends In:
              </Text>
              <CountdownTimer currentStageStartTime={currentStageStartTime} />

              {/* stats about current stage  */}
              <CurrentStageStats
                currentStage={currentStage}
                stageTokenPrice={stageTokenPrice}
                stageTokenSupply={stageTokenSupply}
                maxTokensPerStage={maxTokensPerStage}
              />

              {/* form with input and submit button along with transaction modal */}
              <TokenPurchaseForm
                stageTokenPrice={stageTokenPrice}
                stageTokenSupply={stageTokenSupply}
                maxTokensPerStage={maxTokensPerStage}
                walletFlrBalance={maticBalance}
                walletTokenBalance={tokenBalance}
              />
            </Flex>
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell>
  );
}
