import { Box, TextInput, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import WalletConnectButton from '@/components/WalletConnectButton/WalletConnectButton';
import { TokenPurchaseModalProps } from '@/components/TokenPurchaseForm/types';
import TokenPurchaseModal from '@/components/Modals/TokenPurchaseModal/TokenPurchaseModal';
import { ConnectionProgress } from '@/components/Modals/types';
import TokenPurchaseBalances from '@/components/TokenPurchaseBalances/TokenPurchaseBalances';

/**
 * Form with input field and button to purchase WM tokens
 * @prop stagePrice,
 * @prop stageSupply,
 * @prop stageMaxWalletBuy,
 * @prop walletCurrencyBalance,
 * @prop walletTokenBalance,
 * @returns
 */
const TokenPurchaseForm: React.FC<TokenPurchaseModalProps> = ({
  stagePrice,
  stageSupply,
  stageMinWalletBuy,
  stageMaxWalletBuy,
  walletCurrencyBalance,
  walletTokenBalance,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [connectionProgress, setConnectionProgress] = useState<ConnectionProgress>(
    ConnectionProgress.PENDING
  );
  const { isDisconnected, isConnected } = useAccount();

  const form = useForm({
    initialValues: {
      purchaseAmount: '',
    },

    validate: {
      purchaseAmount: (value) => {
        if (!value) {
          return 'Token amount required';
        }

        // cannot buy above current stage max amount
        if (stageMinWalletBuy && +value < stageMinWalletBuy) {
          return `Amount don't reach minimum tokens to buy: ${stageMinWalletBuy}.`;
        }

        // cannot buy above current stage max amount
        if (stageMaxWalletBuy && +value > stageMaxWalletBuy) {
          return `Amount exceeds maximum tokens to buy: ${stageMaxWalletBuy}.`;
        }

        // cannot buy above current stage token supply
        if (+value > stageSupply) {
          return 'Amount exceeds current token supply.';
        }

        // cannot buy with insufficient wallet balance
        if (+value * stagePrice > walletCurrencyBalance) {
          return 'Insufficient funds.';
        }

        return null;
      },
    },
  });

  // // open modal to confirm amounts
  const handlePurchaseSubmit = () => {
    open();
  };

  const purchaseAmount = +form.values.purchaseAmount;
  const insufficientBalance = purchaseAmount > walletCurrencyBalance;

  return (
    <>
      <Box w="100%" mx="auto">
        <form onSubmit={form.onSubmit(handlePurchaseSubmit)}>
          <TextInput
            placeholder="How much FLR worms can eat?"
            radius="md"
            size="lg"
            my="1rem"
            w="100%"
            min={1}
            step="0.000001"
            {...form.getInputProps('purchaseAmount')}
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
              <Text fz="md">buy WM Tokens</Text>
            </Button>
          )}
        </form>
      </Box>

      {/* show balances depending on the amount of token  */}
      {isConnected && (
        <TokenPurchaseBalances
          insufficientBalance={insufficientBalance}
          purchaseAmount={purchaseAmount}
          purchasePrice={stagePrice}
          walletCurrencyBalance={walletCurrencyBalance}
          walletTokenBalance={walletTokenBalance}
        />
      )}

      {/* token purchase modal  */}
      <TokenPurchaseModal
        opened={opened}
        close={close}
        connectionProgress={connectionProgress}
        setConnectionProgress={setConnectionProgress}
        purchaseAmount={+form.values.purchaseAmount}
        purchasePrice={stagePrice ?? 0}
        walletCurrencyBalance={walletCurrencyBalance}
      />
    </>
  );
};

export default TokenPurchaseForm;
