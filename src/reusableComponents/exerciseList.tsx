import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { Exercise } from '../interfaces';

const ExerciseList = ({ item }: {item : Exercise}) => {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  return (
    <TouchableOpacity
      style={[tw`bg-white p-2 m-2 rounded-md gap-1`, { elevation: 3 }]}
      onPress={() => navigation.navigate('ExerciseDetails', { exercise: item })}
    >
      <Text style={tw`text-black text-lg capitalize`}>{item.name}</Text>
      <Text style={tw`text-gray-400 capitalize`}>
        {item.muscle} | {item.equipment}
      </Text>
    </TouchableOpacity>
  );
};

export default ExerciseList;
