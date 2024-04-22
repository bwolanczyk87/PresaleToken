import { Flex, Text } from '@mantine/core';
import { CurrentStageValues } from '@/components/CurrentStageStats/types';

/**
 * @prop stagePrice - current stage token price
 * @prop stageSupply - available tokens for the current stage
 * @prop stageMaxWalletBuy - maximum tokens a wallet can purchase per stage
 * @returns
 */
const CurrentStageStats: React.FC<CurrentStageValues> = ({
  stagePrice,
  stageSupply,
  stageMinWalletBuy,
  stageMaxWalletBuy,
}) => (
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
      <Text size="1rem" fw={500} color="white" suppressHydrationWarning>
        Presale Supply: <span>{stageSupply.toLocaleString()} WM</span>
      </Text>
    </div>

    <div
      style={{
        width: '100%',
      }}
    >
      <Text size="1rem" fw={500} color="white" suppressHydrationWarning>
        Minimum purchase amount:{' '}
        <span>{stageMinWalletBuy && stageMinWalletBuy.toLocaleString()} WM</span>
      </Text>
      <Text size="1rem" fw={500} color="white" suppressHydrationWarning>
        Maximum purchase amount:{' '}
        <span>{stageMaxWalletBuy && stageMaxWalletBuy.toLocaleString()} WM</span>
      </Text>
    </div>
    <div
      style={{
        width: '100%',
        marginTop: '.2rem',
      }}
    >
      <Text size="1rem" fw={500} color="white" suppressHydrationWarning>
        Presale Price: <span>{stagePrice} FLR</span>
      </Text>
    </div>
  </Flex>
);

export default CurrentStageStats;
