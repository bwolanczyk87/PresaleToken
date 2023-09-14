import { Box, TextInput, Button, Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import WalletConnectButton from '@/components/WalletConnectButton/WalletConnectButton';
import { TokenPurchaseModalProps } from '@/components/TokenPurchaseForm/types';
import TokenPurchaseModal from '@/components/Modals/TokenPurchaseModal/TokenPurchaseModal';
import { ConnectionProgress } from '@/components/Modals/types';

/**
 * Form with input field and button to purchase TSTK tokens
 * @prop stageTokenPrice,
 * @prop stageTokenSupply,
 * @prop maxTokensPerStage,
 * @prop walletMaticBalance,
 * @prop walletTokenBalance,
 * @returns
 */
const TokenPurchaseForm: React.FC<TokenPurchaseModalProps> = ({
  stageTokenPrice,
  stageTokenSupply,
  maxTokensPerStage,
  walletMaticBalance,
  walletTokenBalance,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [connectionProgress, setConnectionProgress] = useState<ConnectionProgress>(
    ConnectionProgress.SUCCESS
  );
  const { isDisconnected } = useAccount();

  const form = useForm({
    initialValues: {
      tokenAmount: '',
    },

    validate: {
      tokenAmount: (value) => {
        if (!value) {
          return 'Token amount required';
        }

        // cannot buy above current stage max amount
        if (maxTokensPerStage && +value > maxTokensPerStage) {
          return 'Amount exceeds maximum tokens per stage.';
        }

        // cannot buy above current stage token supply
        if (+value > stageTokenSupply) {
          return 'Amount exceeds current token supply.';
        }

        // cannot buy with insufficient wallet balance
        if (+value * stageTokenPrice > walletMaticBalance) {
          return 'Insufficent funds.';
        }

        return null;
      },
    },
  });

  // submit form data to purchase token
  const handlePurchaseSubmit = (value: string) => {
    // open modal to confirm amounts
    open();
    console.log({ tokenAmount: value });
  };

  //TODO: Retry token purchase
  const retryTokenPurchase = () => {
    setConnectionProgress(ConnectionProgress.CONNECTING);

    // add more logic
  };

  //TODO: Contract call to purchase token
  const purchaseToken = () => {
    console.log('We are now making contract call to purchase token');
  };

  const totalPriceOfPurchase = +form.values.tokenAmount * stageTokenPrice;
  const insufficientBalance = totalPriceOfPurchase > walletMaticBalance;

  return (
    <>
      <Box w="100%" mx="auto">
        <form onSubmit={form.onSubmit((values) => handlePurchaseSubmit(values.tokenAmount))}>
          <TextInput
            placeholder="Enter token amount"
            radius="md"
            size="lg"
            my="1rem"
            w="100%"
            min={1}
            step="0.00001"
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
          {isDisconnected ? (
            <WalletConnectButton text="Connect wallet to buy" size="lg" isFullWidth />
          ) : (
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
          )}
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
            {walletTokenBalance.toFixed(5)} TSTK
          </Text>
        </Group>
      </Box>

      {/* token purchase modal  */}
      <TokenPurchaseModal
        opened={opened}
        close={close}
        connectionProgress={connectionProgress}
        setConnectionProgress={setConnectionProgress}
        tokenAmount={form.values.tokenAmount}
        walletMaticBalance={walletMaticBalance}
        stageTokenPrice={stageTokenPrice ?? 0}
        totalPriceOfPurchase={totalPriceOfPurchase}
        retryRequest={retryTokenPurchase}
        submitRequest={purchaseToken}
      />
    </>
  );
};

export default TokenPurchaseForm;
