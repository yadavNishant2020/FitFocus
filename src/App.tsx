import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Exercises from './views/exercises';
import ExerciseDetails from './views/exerciseDetails';
import {Text, View} from 'react-native';
import WorkoutLogger from './views/workoutLogger';
import Home from './views/home';

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
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Exercises"
          component={Exercises}
          options={{
            headerShown: true,
            headerTitle: 'Exercises',
            headerTitleStyle: {
              color: 'white',
            },
            headerBackground: () => (
              <View style={{backgroundColor: 'black', flex: 1}} />
            ),
            headerTintColor: 'white',
          }}
        />

        <Stack.Screen
          name="ExerciseDetails"
          component={ExerciseDetails}
          options={{
            headerShown: true,
            headerTitleStyle: {
              color: 'white',
            },
            headerBackground: () => (
              <View style={{backgroundColor: 'black', flex: 1}} />
            ),
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="WorkoutLogger"
          component={WorkoutLogger}
          options={{
            headerShown: true,
            headerTitle: `Workout Logger`,
            headerTitleStyle: {
              color: 'white',
            },
            headerBackground: () => (
              <View style={{backgroundColor: 'black', flex: 1}} />
            ),
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
