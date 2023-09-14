import { Flex, Text } from '@mantine/core';
import { CurrentStageValues } from '@/components/CurrentStageStats/types';

const CurrentStageStats: React.FC<CurrentStageValues> = ({
  stageTokenPrice,
  stageTokenSupply,
  maxTokensPerStage,
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
        Maximum purchase amount:{' '}
        <span>{maxTokensPerStage && maxTokensPerStage.toLocaleString()} TSTK</span>
      </Text>
    </div>
    <div
      style={{
        width: '100%',
        marginTop: '.2rem',
      }}
    >
      <Text size="1rem" fw={500} color="white">
        Presale Price: <span>{stageTokenPrice} MATIC</span>
      </Text>
    </div>
  </Flex>
);

export default CurrentStageStats;
