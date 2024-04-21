import { Title, Box, Text, Group, Image, Flex } from '@mantine/core';
import { ModalPurchaseDetailsProps } from '@/components/Modals/types';

/**
 * Modal section to show details of how many WM tokens to buy and the total cost
 * @prop totalPriceOfPurchase - the total price of token purchase
 * @prop walletFlrBalance - Flr balance for the connected account
 * @prop tokenAmount - amount of tokens to purchase
 * @prop stageTokenPrice - token price for the current stage
 * @returns
 */
const ModalPurchaseDetails: React.FC<ModalPurchaseDetailsProps> = ({
  tokenAmount,
  totalPriceOfPurchase,
  stageTokenPrice,
  walletFlrBalance,
}) => (
  <>
    {/* token and price details to show to the user  */}
    <Title color="white" fw="bold" fz="xl" mb="xl">
      Buy WM Tokens
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
          {totalPriceOfPurchase.toFixed(5)}
        </Text>
        <Flex gap="xs" align="center">
          <Image maw={20} mx="auto" src="/polygon-matic-logo.svg" alt="matic icon" />{' '}
          <Text fw="bold">FLR</Text>
        </Flex>
      </Group>
      <Group position="right" w="100%" mt=".5rem">
        <Text size="sm">
          Balance: <span>{walletFlrBalance.toFixed(5)}</span>
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
          {tokenAmount}
        </Text>
        <Flex gap="xs">
          <Image maw={24} mx="auto" src="/tstk-token-symbol.png" alt="tstk icon" />{' '}
          <Text fw="bold">WM</Text>
        </Flex>
      </Group>
      <Group position="right" w="100%" mt=".5rem">
        <Text size="sm">
          1 WM = <span>{stageTokenPrice.toFixed(5)}</span> FLR
        </Text>
      </Group>
    </Box>
  </>
);

export default ModalPurchaseDetails;
