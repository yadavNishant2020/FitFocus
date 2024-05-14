import React from 'react';
import { View, FlatList } from 'react-native';
import tw from 'twrnc';
import exercises from '../../assets/data/exercises.json';
import ExerciseList from '../reusableComponents/exerciseList';

const Exercises = () => {
  return (
    <View style={tw`flex justify-center bg-gray-200 h-full`}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => <ExerciseList item={item} />}
        keyExtractor={(item) => item.name} 
      />
    </View>
  );
};

export default Exercises;
