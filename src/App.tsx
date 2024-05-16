import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Exercises from './views/exercises';
import ExerciseDetails from './views/exerciseDetails';
import { Text } from 'react-native';

// Demo components for other tab screens
const Profile = () => <Text>Profile Screen</Text>;
const Settings = () => <Text>Settings Screen</Text>;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ExercisesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Exercises"
      component={Exercises}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="ExerciseDetails"
      component={ExerciseDetails}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Exercises" component={ExercisesStack}  options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
