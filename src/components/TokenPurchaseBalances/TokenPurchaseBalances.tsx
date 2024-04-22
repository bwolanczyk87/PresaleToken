import { Box, Group, Text } from '@mantine/core';
import { TokenFormBalancesProps } from '@/components/TokenPurchaseForm/types';

const TokenPurchaseBalances: React.FC<TokenFormBalancesProps> = ({
  insufficientBalance,
  stagePrice,
  saleTokenAmount,
  walletBalance,
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
      <Text size="1rem" fw={500} color={insufficientBalance ? 'red' : 'white'}>
        Worms You want to buy
      </Text>
      <Text size="1rem" fw={600} color={insufficientBalance ? 'red' : 'white'}>
        {Number(saleTokenAmount / stagePrice).toLocaleString()} WM
      </Text>
    </Group>

    <Group position="apart">
      <Text size="1rem" fw={500} color="white">
      Worms You own under bed
      </Text>
      <Text size="1rem" fw={600} color="white">
      {walletTokenBalance.toFixed(5).toLocaleString()} WM
      </Text>
    </Group>

    <Group position="apart" mt="md">
      <Text size="1.2rem" fw={500} color="white">
        Your wallet balance
      </Text>
      <Text size="1.2rem" fw={600} color="white">
        {walletBalance.toFixed(5).toLocaleString()} FLR
      </Text>
    </Group>
  </Box>
);

export default TokenPurchaseBalances;
