import { Grid, Text } from '@mantine/core';
import moment from 'moment';
import { useState, useEffect } from 'react';
/**
 * Countdown timer component
 * Counts down to the end of the current stage
 * @prop currentStageStartTime - The unix timestamp when the current stage block started.
 * @returns React node
 */

const CountdownTimer: React.FC<{ currentStageStartTime: BigInt }> = ({ currentStageStartTime }) => {
  // get the current time
  // add 24 hours to the stage start time
  // use the difference to show countdown
  const [currentTime, setCurrentTime] = useState(moment.unix(Math.floor(Date.now() / 1000)));
  const targetTime = moment.unix(+currentStageStartTime.toString()).add(36, 'hours');

  const duration = moment.duration(targetTime.diff(currentTime));

  // we don't want app to crash when currentStageStartTime is not yet set
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (currentStageStartTime) {
    hours = duration.hours();
    minutes = duration.minutes();
    seconds = duration.seconds();
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
            {hours.toString().padStart(2, '0')}
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
            {minutes.toString().padStart(2, '0')}
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
