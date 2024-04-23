import { Box, Group, Text } from '@mantine/core';
import { TokenFormBalancesProps } from '@/components/TokenPurchaseForm/types';

const TokenPurchaseBalances: React.FC<TokenFormBalancesProps> = ({
  insufficientBalance,
  purchasePrice,
  purchaseAmount,
  walletCurrencyBalance,
  walletTokenBalance,
}) => (
  <Box
    sx={{
      borderRadius: '0.75rem',
      backgroundColor: '#304221',
      padding: '20px',
      width: '100%',
    }} 
  >
    <Group position="apart">
      <Text size="1.2rem" fw={500} color={insufficientBalance ? 'red' : 'white'}>
        Worms to buy:
      </Text>
      <Text size="1.2rem" fw={600} color={insufficientBalance ? 'red' : 'white'}>
        {Number(purchasePrice > 0 ? purchaseAmount / purchasePrice : 0).toLocaleString()} WM
      </Text>
    </Group>

    <Group position="apart" mt="md">
      <Text size="1.0rem" fw={500} color="white">
        Flare in your wallet:
      </Text>
      <Text size="1.0rem" fw={600} color="white">
        {walletCurrencyBalance.toFixed(2).toLocaleString()} FLR
      </Text>
    </Group>

    <Group position="apart">
      <Text size="1rem" fw={500} color="white">
        Worms in your wallet:
      </Text>
      <Text size="1rem" fw={600} color="white">
        {walletTokenBalance.toFixed(2).toLocaleString()} WM
      </Text>
    </Group>
  </Box>
);

export default TokenPurchaseBalances;
