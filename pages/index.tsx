import {
  AppShell,
  Header,
  Flex,
  Title,
  Text,
  Container,
  Grid,
  TextInput,
  Button,
  Box,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import HeaderContainer from '@/components/HeaderContainer/HeaderContainer';

export default function HomePage() {
  //TODO: Fetch these values dynamically
  const walletMaticBalance = 1.5099;
  const stageTokenPrice = 0.0001;
  const stageTokenSupply = 99000;
  const form = useForm({
    initialValues: {
      tokenAmount: '',
    },

    validate: {
      tokenAmount: (value) => {
        if (!value) {
          return 'Token amount required';
        }
        // cannot buy above current stage token supply
        if (+value > stageTokenSupply) {
          return 'Amount exceeds current token supply';
        }

        // cannot buy with insufficient wallet balance
        if (+value * stageTokenPrice > walletMaticBalance) {
          return 'Insufficent funds';
        }

        return null;
      },
    },
  });

  const totalPriceOfPurchase = +form.values.tokenAmount * stageTokenPrice;
  const insufficientBalance = totalPriceOfPurchase > walletMaticBalance;

  return (
    <AppShell
      padding="md"
      fixed={false}
      style={{
        height: '100vh',
      }}
      header={
        <Header height={80} p="lg">
          <HeaderContainer walletConnected />
        </Header>
      }
    >
      <Container size="lg" pt="xl">
        <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={120}>
          <Grid.Col span={6}>
            <Flex
              h="100%"
              gap="md"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
              p="xl"
            >
              <Title
                order={1}
                size="h1"
                color="white"
                style={{
                  fontSize: '3.5rem',
                }}
              >
                Buy{' '}
                <span
                  style={{
                    color: 'rgb(147 51 234)',
                  }}
                >
                  TSTK
                </span>{' '}
                Now, to Get Rich In The Future
              </Title>
              <Text mt="lg" mb="xl">
                TSTK is not just a DeFi token, it is the best DeFi token that you can invest in
                right now!
              </Text>
            </Flex>
          </Grid.Col>

          <Grid.Col span={6}>
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
              <Text mb="sm" align="left" size="1.5rem" w="100%" color="white" fw="bold">
                Presale Stage Ends In:
              </Text>

              <Grid
                gutter={5}
                gutterXs="md"
                gutterMd="xl"
                gutterXl={20}
                grow
                style={{
                  width: '100%',
                }}
                p={0}
              >
                <Grid.Col span={4}>
                  <div
                    style={{
                      borderRadius: '0.5rem',
                      backgroundColor: '#485A16',
                      padding: '20px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Text fw="bold" size="3rem" color="white">
                      15
                    </Text>
                    <Text fw="bold" size="sm" color="white">
                      HOURS
                    </Text>
                  </div>
                </Grid.Col>
                <Grid.Col span={4}>
                  <div
                    style={{
                      borderRadius: '0.5rem',
                      backgroundColor: '#485A16',
                      padding: '20px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Text fw="bold" size="3rem" color="white">
                      09
                    </Text>
                    <Text fw="bold" size="sm" color="white">
                      MINUTES
                    </Text>
                  </div>
                </Grid.Col>
                <Grid.Col span={4}>
                  <div
                    style={{
                      borderRadius: '0.5rem',
                      backgroundColor: '#485A16',
                      padding: '20px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Text fw="bold" size="3rem" color="white">
                      45
                    </Text>
                    <Text fw="bold" size="sm" color="white">
                      SECONDS
                    </Text>
                  </div>
                </Grid.Col>
              </Grid>

              {/* stats about token  */}
              <Flex
                mih={50}
                w="100%"
                gap="0"
                justify="center"
                align="flex-start"
                direction="column"
                wrap="wrap"
              >
                <div
                  style={{
                    width: '100%',
                    marginTop: '1rem',
                  }}
                >
                  <Text size="1rem" fw={500} color="white">
                    Presale Stage: <span>#4</span>
                  </Text>
                </div>
                <div
                  style={{
                    width: '100%',
                  }}
                >
                  <Text size="1rem" fw={500} color="white">
                    Presale Supply: <span>{stageTokenSupply.toLocaleString()} TSTK</span>
                  </Text>
                </div>
                <div
                  style={{
                    width: '100%',
                  }}
                >
                  <Text size="1rem" fw={500} color="white">
                    Presale price: <span>{stageTokenPrice} MATIC</span>
                  </Text>
                </div>
              </Flex>

              {/* form with input and submit */}
              <Box w="100%" mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <TextInput
                    placeholder="Enter token amount"
                    radius="md"
                    size="lg"
                    my="1rem"
                    w="100%"
                    min={1}
                    {...form.getInputProps('tokenAmount')}
                    type="number"
                    styles={{
                      input: {
                        backgroundColor: 'transparent',
                        border: '1px solid #485A16',
                        color: 'white',
                        fontWeight: 500,
                        '&:hover': {
                          border: '1px solid green',
                        },
                        '&:focus': {
                          border: '1px solid green',
                        },
                      },
                    }}
                  />

                  {/* button to submit  */}
                  <Button
                    radius="md"
                    size="lg"
                    uppercase
                    style={{
                      backgroundColor: '#CAFC36',
                      color: '#000000',
                    }}
                    fullWidth
                    type="submit"
                  >
                    <Text fz="md">buy TSTK Tokens</Text>
                  </Button>
                </form>
              </Box>
              <Box
                sx={{
                  borderRadius: '0.75rem',
                  backgroundColor: '#304221',
                  padding: '20px',
                  width: '100%',
                }}
              >
                <Group position="apart">
                  <Text size="1rem" fw={500} color="white">
                    Amount to pay
                  </Text>
                  <Text size="1rem" fw={600} color={insufficientBalance ? 'red' : 'white'}>
                    {totalPriceOfPurchase.toFixed(5)} MATIC
                  </Text>
                </Group>

                <Group position="apart">
                  <Text size="1rem" fw={500} color="white">
                    Wallet Balance
                  </Text>
                  <Text size="1rem" fw={600} color="white">
                    {walletMaticBalance.toFixed(5)} MATIC
                  </Text>
                </Group>

                <Group position="apart" mt="md">
                  <Text size="1.2rem" fw={500} color="white">
                    You own
                  </Text>
                  <Text size="1.2rem" fw={600} color="white">
                    {walletMaticBalance.toFixed(5)} TSTK
                  </Text>
                </Group>
              </Box>
            </Flex>
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell>
  );
}
