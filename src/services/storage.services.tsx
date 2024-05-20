import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

 export const storeSetData = async (exerciseName: string, setData: string) => {
    try {
      await AsyncStorage.setItem(
        `setData_${exerciseName}`,
        JSON.stringify(setData),
      );
      console.log('Data stored successfully for exercise:', exerciseName);
    } catch (error) {
      console.error(
        `Error storing set data for exercise ${exerciseName}:`,
        error,
      );
      Alert.alert(
        'Error',
        `Failed to store set data for exercise ${exerciseName}.`,
      );
    }
  };

  export const retrieveSetData = async (exerciseName: string) => {
    try {
      const storedSetData = await AsyncStorage.getItem(
        `setData_${exerciseName}`,
      );
      return storedSetData ? JSON.parse(storedSetData) : [];
      console.log('Data retrived successfully for exercise:', exerciseName);

    } catch (error) {
      console.error(
        `Error retrieving set data for exercise ${exerciseName}:`,
        error,
      );
      Alert.alert(
        'Error',
        `Failed to retrieve set data for exercise ${exerciseName}.`,
      );
      return [];
    }
  };