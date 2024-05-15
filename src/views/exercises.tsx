import React from 'react';
import { View, FlatList, Text } from 'react-native';
import tw from 'twrnc';
import exercises from '../../assets/data/exercises.json';
import ExerciseList from '../reusableComponents/exerciseList';

const Exercises = ({ navigation } : {navigation : any}) => { 
  return (
    <View style={tw`flex justify-center bg-gray-200 h-full`}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseList
            item={item}
            navigation={navigation} 
          />
        )}
        keyExtractor={(item, index) => item.name + index}
      />
    </View>
  );
};

export default Exercises;