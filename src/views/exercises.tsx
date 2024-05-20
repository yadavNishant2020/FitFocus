import React, { useState } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import tw from 'twrnc';
import exercises from '../assets/data/exercises.json';
import ExerciseList from '../reusableComponents/exerciseList';

const Exercises = ({ navigation } : {navigation : any}) => { 
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={tw`flex justify-center bg-gray-200 h-full`}>
      <TextInput
        style={tw`p-3 m-2 bg-[#1F2937] rounded text-white text-lg`}
        placeholder="Search exercises"
        placeholderTextColor={"#6b717b"}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredExercises}
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
