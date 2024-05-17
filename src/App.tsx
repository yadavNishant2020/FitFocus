import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Exercises from './views/exercises';
import ExerciseDetails from './views/exerciseDetails';
import {Text} from 'react-native';
import workoutLogger from './views/workoutLogger';
import WorkoutLogger from './views/workoutLogger';

// Demo components for other tab screens
const Profile = () => <Text>Profile Screen</Text>;
const Settings = () => <Text>Settings Screen</Text>;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const ExercisesStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Exercises"
//       component={Exercises}
//       options={{headerShown: true, headerTitle: 'Exercises'}}
//     />
//     <Stack.Screen
//       name="ExerciseDetails"
//       component={ExerciseDetails}
//       options={{headerShown: true, headerTitle: 'Exercise Details'}}
//     />
//     <Stack.Screen
//       name="WorkoutLogger"
//       component={WorkoutLogger}
//       options={{headerShown: true , headerTitle: 'Workout Logger'}}
//     />
//   </Stack.Navigator>
// );

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Exercises"
          component={Exercises}
          options={{headerShown: true, headerTitle: 'Exercises'}}
        />
        <Stack.Screen
          name="ExerciseDetails"
          component={ExerciseDetails}
          options={{headerShown: true, headerTitle: 'Exercise Details'}}
          
        />
        <Stack.Screen
          name="WorkoutLogger"
          component={WorkoutLogger}
          options={{headerShown: true, headerTitle: `Workout Logger`}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
