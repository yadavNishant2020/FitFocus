import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const ExerciseDetails = ({ route } : {route: any}) => {
    const { exerciseName } = route.params;
    return (
      <View style={tw`flex justify-center items-center bg-gray-800 h-full`}>
        <Text>{exerciseName}</Text>
      </View>
    );
  };

export default ExerciseDetails