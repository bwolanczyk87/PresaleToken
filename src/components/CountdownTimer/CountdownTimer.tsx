import { Grid, Text } from '@mantine/core';
import moment from 'moment';
import { useState, useEffect } from 'react';
/**
 * Countdown timer component.
 * Counts down to the end of the day since each presale stage takes 24 hours - need to update this to be more accurate
 * @returns React node
 */

const CountdownTimer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const now = moment();
      const endOfDay = moment().endOf('day');
      const duration = moment.duration(endOfDay.diff(now));
      setTimeRemaining({
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    }, 1000);

    return () => clearInterval(timerInterval);
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
            {timeRemaining.hours.toString().padStart(2, '0')}
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
            {timeRemaining.minutes.toString().padStart(2, '0')}
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
            {timeRemaining.seconds.toString().padStart(2, '0')}
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
