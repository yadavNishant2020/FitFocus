import { useState, useEffect } from 'react';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes
} from 'react-native-sensors';
import { map, filter } from 'rxjs/operators';

const usePedometer = () => {
  const [steps, setSteps] = useState(0);
  const [previousMagnitude, setPreviousMagnitude] = useState(0);
  const [magnitudeThreshold, setMagnitudeThreshold] = useState(15); // Adjustable threshold

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 400); // Set update interval to 400ms

    const subscription = accelerometer
      .pipe(
        map(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z)), // Calculate magnitude
        filter(magnitude => {
          const isPeak = magnitude > previousMagnitude;
          const isSignificantChange = Math.abs(magnitude - previousMagnitude) > magnitudeThreshold;
          setPreviousMagnitude(magnitude);
          return isPeak && isSignificantChange;
        })
      )
      .subscribe({
        next: () => setSteps(prevSteps => prevSteps + 1),
        error: (error) => console.log('The sensor is not available', error),
      });

    return () => subscription.unsubscribe();
  }, [previousMagnitude, magnitudeThreshold]);

  return steps;
};

export default usePedometer;
