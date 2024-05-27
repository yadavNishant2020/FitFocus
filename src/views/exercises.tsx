import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import tw from 'twrnc';
import exercises from '../assets/data/exercises.json';
import ExerciseList from '../reusableComponents/exerciseList';
import SearchBar from '../reusableComponents/searchBar';
import LinearGradient from 'react-native-linear-gradient';
import { ExerciseListProps } from '../interfaces';

const Exercises = ({navigation, route}: ExerciseListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { showAll } = route.params || {}; 

  const filteredExercises = exercises.filter(exercise => {
    if (searchQuery.length > 0) {
      return exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (route.params?.Muscle) {
      return exercise.muscle.toLowerCase().includes(route.params.Muscle.toLowerCase());
    } else {
      return true; // Show all exercises by default
    }
  });

  return (
    <LinearGradient
    colors={['#000000', '#4B749F']}
    start={{x: 0.1, y: 0.1}}
    end={{x: 1, y: 1}}
    style={[tw`h-full`]}>
    <View style={tw`flex justify-center h-full`}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredExercises}
        renderItem={({item}) => (
          <ExerciseList item={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => item.name + index}
      />
    </View>
    </LinearGradient>
  );
};

export default Exercises;
