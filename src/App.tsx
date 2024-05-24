import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';
import {HealthProvider} from './hooks/health';
import Exercises from './views/exercises';
import ExerciseDetails from './views/exerciseDetails';
import WorkoutLogger from './views/workoutLogger';
import Home from './views/home';
import Steps from './views/steps';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Demo component for Settings screen
const Settings = () => <Text>Settings Screen</Text>;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Define your stack navigator screens
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <Stack.Screen
      name="Steps"
      component={Steps}
      options={{
        headerShown: true,
        headerTitle: 'Steps',
        headerTitleStyle: {color: 'white'},
        headerBackground: () => (
          <View style={{backgroundColor: 'black', flex: 1}} />
        ),
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen
      name="Exercises"
      component={Exercises}
      options={{
        headerShown: true,
        headerTitle: 'Exercises',
        headerTitleStyle: {color: 'white'},
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
        headerTitleStyle: {color: 'white'},
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
        headerTitle: 'Workout Logger',
        headerTitleStyle: {color: 'white'},
        headerBackground: () => (
          <View style={{backgroundColor: 'black', flex: 1}} />
        ),
        headerTintColor: 'white',
      }}
    />
  </Stack.Navigator>
);

// Main app component
const App = () => {
  return (
    <HealthProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: route.name === 'Steps' || route.name === 'Exercises',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: 'white', fontSize: 25},
            headerBackground: () => (
              <View style={{backgroundColor: 'black', flex: 1}} />
            ),
            tabBarIcon: ({color, size}) => {
              let iconName: any;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Steps') {
                iconName = 'footsteps';
              } else if (route.name === 'Exercises') {
                iconName = 'accessibility';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#4B749F',
            tabBarStyle: {backgroundColor: '#1f2937'},
          })}>
          <Tab.Screen name="Home" component={StackNavigator} />
          <Tab.Screen name="Steps" component={Steps} />
          <Tab.Screen name="Exercises" component={Exercises} />
        </Tab.Navigator>
      </NavigationContainer>
    </HealthProvider>
  );
};

export default App;
