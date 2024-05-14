import React from 'react';
import { View, FlatList, Text } from 'react-native';
import tw from 'twrnc';
import exercises from './assets/data/exercises.json';
import ExerciseList from './src/reusableComponents/exerciseList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Home = ({ navigation } : {navigation : any}) => { // Pass navigation prop here
  return (
    <View style={tw`flex justify-center bg-gray-200 h-full`}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseList
            item={item}
            navigation={navigation} // Pass navigation prop to ExerciseList
          />
        )}
        keyExtractor={(item, index) => item.name + index}
      />
    </View>
  );
};

const ExerciseDetails = () => {
  return (
    <View>
      <Text>Exercise Details</Text>
    </View>
  );
};

export default App;
