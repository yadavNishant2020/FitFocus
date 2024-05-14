import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Exercise } from '../interfaces';

const ExerciseList = ({ item }: { item: Exercise }) => {
  return (
    <View style={[tw`bg-white p-2 m-2 rounded-md gap-1`, { elevation: 3 }]}>
      <Text style={tw`text-black text-lg capitalize`}>{item.name}</Text>
      <Text style={tw`text-gray-400 capitalize`}>
        {item.muscle} | {item.equipment}
      </Text>
    </View>
  );
};

export default ExerciseList;
