import { Grid, Text } from '@mantine/core';
import moment from 'moment';
import { useState, useEffect } from 'react';
import useGetCurrentStageStats from '@/hooks/useGetCurrentStageStats';
/**
 * Countdown timer component
 * Counts down to the end of the current stage
 * @prop stageStartTime - The unix timestamp when the current stage block started.
 * @returns React node
 */

const CountdownTimer: React.FC<{ stageStartTime: number }> = ({ stageStartTime }) => {
  // get the current time
  // add 24 hours (duration per stage) to the stage start time
  // use the difference to show countdown
  const [currentTime, setCurrentTime] = useState(moment.unix(Math.floor(Date.now() / 1000)));

  // const preSaleStartDate = new Date(Date.UTC(2024, 3, 24, 18, 0, 0));
  // stageStartTime = BigInt(Math.floor(preSaleStartDate.getTime() / 1000));
  //stageStartTime = BigInt(22805933);
  // it is difficult to determine exactly how long the stage takes
  // this is because the time between blocks is not always 2 seconds
  const targetTime = moment.unix(+stageStartTime.toString());
  const duration = moment.duration(targetTime.diff(currentTime));

  // we don't want app to crash when stageStartTime is not yet set
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (stageStartTime) {
    days = Math.abs(duration.days());
    hours = Math.abs(duration.hours());
    minutes = Math.abs(duration.minutes());
    seconds = Math.abs(duration.seconds());
  }

  // refetch new stage end time when the current one ends
  const { refetchCurrentStageStats } = useGetCurrentStageStats();
  if (duration.as('milliseconds') === 0) {
    refetchCurrentStageStats();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid
      gutter={5}
      gutterXs="md"
      gutterMd="xl"
      gutterXl={20}
      style={{
        width: '100%',
      }}
      p={0}
    >
      <Grid.Col span={3}>
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
          <Text fw="bold" size="3rem" color="white" suppressHydrationWarning>
            {days.toString().padStart(2, '0')}
          </Text>
          <Text fw="bold" size="sm" color="white">
            DAYS
          </Text>
        </div>
      </Grid.Col>
      <Grid.Col span={3}>
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
          <Text fw="bold" size="3rem" color="white" suppressHydrationWarning>
            {hours.toString().padStart(2, '0')}
          </Text>
          <Text fw="bold" size="sm" color="white">
            HOURS
          </Text>
        </div>
      </Grid.Col>
      <Grid.Col span={3}>
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
          <Text fw="bold" size="3rem" color="white" suppressHydrationWarning>
            {minutes.toString().padStart(2, '0')}
          </Text>
          <Text fw="bold" size="sm" color="white">
            MINUTES
          </Text>
        </div>
      </Grid.Col>
      <Grid.Col span={3}>
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
          <Text fw="bold" size="3rem" color="white" suppressHydrationWarning>
            {seconds.toString().padStart(2, '0')}
          </Text>
          <Text fw="bold" size="sm" color="white">
            SECONDS
          </Text>
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default CountdownTimer;
