import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { ExerciseListProps } from '../interfaces';

const ExerciseList: React.FC<ExerciseListProps> = ({ item, navigation }) => {
  const handlePress = () => {
    navigation.navigate('ExerciseDetails', { exercise: item });
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress} style={[tw`bg-white p-2 m-2 rounded-md gap-1`, { elevation: 3 }]}>
       <Text style={tw`text-black text-lg capitalize`}>{item.name}</Text>
      <Text style={tw`text-gray-400 capitalize`}>
        {item.muscle} | {item.equipment}
      </Text>
    </TouchableOpacity>
  );
};

export default ExerciseList;
