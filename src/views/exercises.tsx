import React, { useState } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import tw from 'twrnc';
import exercises from '../assets/data/exercises.json';
import ExerciseList from '../reusableComponents/exerciseList';
import SearchBar from '../reusableComponents/searchBar';

const Exercises = ({ navigation } : {navigation : any}) => { 
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={tw`flex justify-center bg-gray-200 h-full`}>
     <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
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
