import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Exercises from './src/views/exercises';
import ExerciseDetails from './src/views/exerciseDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Exercises" component={Exercises} />
        <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;