import { Title, Box, Text, Group, Image, Flex } from '@mantine/core';
import { ModalPurchaseDetailsProps } from '@/components/Modals/types';

/**
 * Modal section to show details of how many WM tokens to buy and the total cost
 * @prop purchaseAmount - the total price of token purchase
 * @prop walletCurrencyBalance - Flr balance for the connected account
 * @prop purchaseAmount - amount of tokens to purchase
 * @prop purchasePrice - token price for the current stage
 * @returns
 */
const ModalPurchaseDetails: React.FC<ModalPurchaseDetailsProps> = ({
  purchaseAmount,
  purchaseQuantity,
  purchasePrice,
  walletCurrencyBalance,
}) => (
  <>
  
    {/* token and price details to show to the user  */}
    <Title color="white" fw="bold" fz="xl" mb="xl">
      Buy Worm Tokens
    </Title>
    <Box
      sx={{
        borderRadius: '0.75rem',
        padding: '20px',
        width: '100%',
        backgroundColor: '#25262B',
      }}
    >
      <Text color="white" fw={500}>
        You pay
      </Text>
      <Group position="apart">
        <Text size="1.2rem" fw={600} color="white">
          {  
          (new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 6
          })).format(purchaseAmount).toLocaleString()}
        </Text>
        <Flex gap="xs" align="center">
          <Image maw={20} mx="auto" src="/flare-logo.png" alt="Flare" />{' '}
          <Text fw="bold">FLR</Text>
        </Flex>
      </Group>
      <Group position="right" w="100%" mt=".5rem">
        <Text size="sm">
          Balance: <span>{walletCurrencyBalance.toFixed(6).toLocaleString()}</span>
        </Text>
      </Group>
    </Box>
    <Box
      sx={{
        borderRadius: '0.75rem',
        padding: '20px',
        width: '100%',
        backgroundColor: '#25262B',
        marginTop: '.5rem',
      }}
    >
      <Text color="white" fw={500}>
        You receive
      </Text>
      <Group position="apart">
        <Text size="1.2rem" fw={600} color="white">
          {  
          (new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 6
          })).format(purchaseQuantity).toLocaleString()}
        </Text>
        <Flex gap="xs">
          <Image maw={24} mx="auto" src="/tstk-token-symbol.png" alt="tstk icon" />{' '}
          <Text fw="bold">WM</Text>
        </Flex>
      </Group>
      <Group position="right" w="100%" mt=".5rem">
        <Text size="sm">
          1 WM = <span>{purchasePrice.toFixed(6)}</span> FLR
        </Text>
      </Group>
    </Box>
  </>
);

export default ModalPurchaseDetails;
