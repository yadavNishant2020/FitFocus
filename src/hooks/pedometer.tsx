import { useState, useEffect } from 'react';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes
} from 'react-native-sensors';
import { map } from 'rxjs/operators';

const usePedometer = () => {
  const [steps, setSteps] = useState(0);
  const [magnitudePrevious, setMagnitudePrevious] = useState(0);

  useEffect(() => {
    // Set update interval to 400ms for the accelerometer
    setUpdateIntervalForType(SensorTypes.accelerometer, 400);

    const subscription = accelerometer
      .pipe(
        map(({ x, y, z }) => {
          // Calculate the magnitude of the acceleration vector
          return Math.sqrt(x * x + y * y + z * z);
        })
      )
      .subscribe({        
        next: (magnitude) => {
          const magnitudeDelta = magnitude - magnitudePrevious;
          setMagnitudePrevious(magnitude);

          // Update steps if the magnitude change exceeds the threshold
          if (magnitudeDelta > 2) {
            setSteps((prevSteps) => prevSteps + 1);
          }
        },
        error: (error) => console.log('The sensor is not available', error),
      });

    // Clean up the subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [magnitudePrevious]);

  return steps;
};

export default usePedometer;
