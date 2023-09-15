import { AppShell, Header, Flex, Text, Container, Grid } from '@mantine/core';
import { useBalance, useAccount, useContractReads } from 'wagmi';
import { useState, useEffect } from 'react';
import HeaderContainer from '@/components/HeaderContainer/HeaderContainer';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import CurrentStageStats from '@/components/CurrentStageStats/CurrentStageStats';
import TokenPurchaseForm from '@/components/TokenPurchaseForm/TokenPurchaseForm';
import TstkBanner from '@/components/TstkBanner/TstkBanner';

const ABI = require('@/contract/PresaleContractABI');

export default function HomePage() {
  const preSaleContract = {
    address: process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS as `0x${string}` | undefined,
    abi: ABI,
  };

  const {
    data: preSaleStageStats,
    isError: errorLoadingStageStats,
    isLoading: loadingStageStats,
  } = useContractReads({
    contracts: [
      {
        ...preSaleContract,
        functionName: 'currentStagePrice',
      },
      {
        ...preSaleContract,
        functionName: 'currentStage',
      },
      {
        ...preSaleContract,
        functionName: 'currentStageAvailableAmount',
      },
    ],
  });

  const [walletBalance, setWalletBalance] = useState<{ matic: number; token: number }>({
    matic: 0,
    token: 0,
  });
  const [currentStageStats, setCurrentStageStats] = useState<{
    stageTokenPrice: number;
    stageTokenSupply: number;
    currentStage: number;
  }>({ stageTokenPrice: 0, stageTokenSupply: 0, currentStage: 1 });

  // get connected account
  const { address } = useAccount();

  // get account MATIC balance
  const { data: maticData } = useBalance({
    address,
  });

  // get account TSTX balance
  const { data: tokenData } = useBalance({
    address,
    token: process.env.NEXT_PUBLIC_TSTK_TOKEN_ADDRESS as `0x${string}` | undefined,
  });

  // account balance
  useEffect(() => {
    if (!maticData?.formatted || !tokenData?.formatted) return;
    setWalletBalance((prevState) => ({
      ...prevState,
      matic: +maticData.formatted,
      token: +tokenData.formatted,
    }));
  }, [maticData?.formatted, tokenData?.formatted]);

  // stage stats
  useEffect(() => {
    if (loadingStageStats || errorLoadingStageStats || !preSaleStageStats) return;
    setCurrentStageStats((prevState) => {
      const [price, stage, supply] = preSaleStageStats as {
        result: number;
        status: string;
      }[];
      return {
        ...prevState,
        stageTokenPrice: parseFloat(price.result.toString()) / 10 ** 18,
        stageTokenSupply: parseFloat(supply.result.toString()) / 10 ** 18,
        currentStage: stage.result,
      };
    });
  }, [loadingStageStats, errorLoadingStageStats, preSaleStageStats]);

  // max amount a wallet can purchase per stage
  //TODO: get this from contract
  const maxTokensPerStage = 10000;

  return (
    <AppShell
      padding="md"
      fixed={false}
      style={{
        height: '100vh',
      }}
      header={
        <Header height={80} p="lg">
          <HeaderContainer walletConnected={false} />
        </Header>
      }
    >
      <Container size="lg" pt="xl">
        <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={120}>
          <Grid.Col xs={12} sm={6}>
            <TstkBanner />
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
                Presale Stage #{currentStageStats.currentStage.toString()} Ends In:
              </Text>
              <CountdownTimer />

              {/* stats about current stage  */}
              <CurrentStageStats
                currentStage={currentStageStats.currentStage}
                stageTokenPrice={currentStageStats.stageTokenPrice}
                stageTokenSupply={currentStageStats.stageTokenSupply}
                maxTokensPerStage={maxTokensPerStage}
              />

              {/* form with input and submit button along with transaction modal */}
              <TokenPurchaseForm
                stageTokenPrice={currentStageStats.stageTokenPrice}
                stageTokenSupply={currentStageStats.stageTokenSupply}
                maxTokensPerStage={maxTokensPerStage}
                walletMaticBalance={walletBalance.matic}
                walletTokenBalance={walletBalance.token}
              />
            </Flex>
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell>
  );
}
