import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';

interface HeathContextType {
  isInitialized: boolean;
  permissionsGranted: boolean;
  totalSteps: number;
  totalCalories: number;
  totalFloorsClimed: number;
  totalDistance: number;
  error: string | null;
  handleRequestPermission: () => Promise<void>;
  handleReadRecords: (selectedDate: Date) => Promise<void>;
}

const defaultContextValue: HeathContextType = {
  isInitialized: false,
  permissionsGranted: false,
  totalSteps: 0,
  totalCalories: 0,
  totalFloorsClimed: 0,
  totalDistance: 0,
  error: null,
  handleRequestPermission: async () => {},
  handleReadRecords: async (selectedDate: Date) => {},
};

const healthContext = createContext<HeathContextType>(defaultContextValue);

export const HealthProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalFloorsClimed, setTotalFloorsClimed] = useState<number>(0);
  const [totalDistance, setTotalDistance] = useState<number>(0);
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

  const handleRequestPermission = async () => {
    try {
      const granted: any = await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'TotalCaloriesBurned' },
        { accessType: 'read', recordType: 'FloorsClimbed' },
        { accessType: 'read', recordType: 'Distance' },
      ]);
      setPermissionsGranted(granted);
      if (!granted) {
        setError(
          'Permission not granted for reading Steps or TotalCaloriesBurned',
        );
      }
    } catch (err) {
      setError('Error requesting permission');
      console.error('Permission request error:', err);
    }
  };

  const handleReadRecords = async (selectedDate: Date) => {
    try {
      const startTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        0,
        0,
        0,
        0,
      );
      const endTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
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

      const floorResult: any = await readRecords('FloorsClimbed', {
        timeRangeFilter: {
          operator: 'between',
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      });

      const distanceResult: any = await readRecords('Distance', {
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

      if (distanceResult && distanceResult.length > 0) {
        const distanceInMeters =
          distanceResult[0]?.distance?.inMeters || 0;
        const distanceInKilometers = distanceInMeters / 1000;
        const formattedDistance = distanceInKilometers.toFixed(3);
        setTotalDistance(parseFloat(formattedDistance));
      } else {
        setTotalDistance(0);
      }

      if (calorieResult && calorieResult.length > 0) {
        const totalCalories = calorieResult.reduce((acc: any, record: any) => {
          return acc + record.energy.inKilocalories;
        }, 0);

        const formattedCalories = totalCalories
          .toFixed(0)
          .replace(/\.0$/, '');

        setTotalCalories(formattedCalories);
      } else {
        setTotalCalories(0);
      }
      if (floorResult && floorResult.length > 0) {
        const totalFloorsClimed = floorResult;
        setTotalFloorsClimed(totalFloorsClimed);
      } else {
        setTotalFloorsClimed(0);
      }
    } catch (err) {
      setError('Error reading records');
      console.error('Read records error:', err);
    }
  };

  return (
    <healthContext.Provider
      value={{
        isInitialized,
        permissionsGranted,
        totalSteps,
        totalCalories,
        totalFloorsClimed,
        totalDistance,
        error,
        handleRequestPermission,
        handleReadRecords,
      }}>
      {children}
    </healthContext.Provider>
  );
};

export const useHealth = () => {
  return useContext(healthContext);
};
