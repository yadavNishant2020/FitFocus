import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Exercises from '../views/exercises';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Exercises} />
          
        </Tab.Navigator>
      </NavigationContainer>
    );
  }