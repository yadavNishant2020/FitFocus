import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initialize, requestPermission, readRecords } from 'react-native-health-connect';

interface StepCounterContextType {
  isInitialized: boolean;
  permissionsGranted: boolean;
  totalSteps: number;
  totalCalories: number;
  error: string | null;
  handleRequestPermission: () => Promise<void>;
}

const defaultContextValue: StepCounterContextType = {
  isInitialized: false,
  permissionsGranted: false,
  totalSteps: 0,
  totalCalories: 0,
  error: null,
  handleRequestPermission: async () => {},
};

const StepCounterContext = createContext<StepCounterContextType>(defaultContextValue);

export const StepCounterProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeHealthConnect = async () => {
      try {
        const initialized = await initialize();
        setIsInitialized(initialized);
        if (initialized) {
          await handleRequestPermission();
        }
      } catch (err) {
        setError('Failed to initialize Health Connect');
        console.error('Initialization error:', err);
      }
    };

    initializeHealthConnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (permissionsGranted) {
        await handleReadRecords();
      }
    };

    let interval: NodeJS.Timeout;
    if (permissionsGranted) {
      fetchData(); // Initial fetch
      interval = setInterval(fetchData, 20000); // Subsequent fetches every 20 seconds
    }

    return () => {
      clearInterval(interval);
    };
  }, [permissionsGranted]);

  const handleRequestPermission = async () => {
    try {
      const granted: any = await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'TotalCaloriesBurned' },
      ]);
      setPermissionsGranted(granted);
      if (!granted) {
        setError('Permission not granted for reading Steps or TotalCaloriesBurned');
      }
    } catch (err) {
      setError('Error requesting permission');
      console.error('Permission request error:', err);
    }
  };

  const handleReadRecords = async () => {
    try {
      const currentDate = new Date();
      const startTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        0,
        0,
        0,
        0,
      );
      const endTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        23,
        59,
        59,
        999,
      );

      const stepResult: any = await readRecords('Steps', {
        timeRangeFilter: {
          operator: 'between',
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      });

      const calorieResult: any = await readRecords('TotalCaloriesBurned', {
        timeRangeFilter: {
          operator: 'between',
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      });

      if (stepResult && stepResult.length > 0) {
        const totalSteps = stepResult.reduce(
          (acc: any, record: any) => acc + record.count,
          0,
        );
        setTotalSteps(totalSteps);
      } else {
        setTotalSteps(0);
      }

      if (calorieResult && calorieResult.length > 0) {
        const totalCalories = calorieResult.reduce((acc: any, record: any) => {
          return acc + record.energy.inKilocalories;
        }, 0);

        const formattedCalories = totalCalories.toFixed(0).replace(/\.0$/, '');

        setTotalCalories(formattedCalories);
      } else {
        setTotalCalories(0);
      }
    } catch (err) {
      setError('Error reading records');
      console.error('Read records error:', err);
    }
  };

  return (
    <StepCounterContext.Provider
      value={{ isInitialized, permissionsGranted, totalSteps, totalCalories, error, handleRequestPermission }}>
      {children}
    </StepCounterContext.Provider>
  );
};

export const useStepCounter = () => {
  return useContext(StepCounterContext);
};
