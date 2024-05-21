import React from 'react';
import {TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {ExerciseListProps} from '../interfaces';
import Header from './header';

const ExerciseList: React.FC<ExerciseListProps> = ({item, navigation}) => {
  const handlePress = () => {
    navigation.navigate('WorkoutLogger', {exercise: item});
  };
  const handleInfoPress = () => {
    navigation.navigate('ExerciseDetails', {exercise: item});
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={handlePress}
      style={[tw`m-1 rounded-md`]}>
    <Header exercise={item} navigation={navigation} onPressInfo={handleInfoPress} />
    </TouchableOpacity>
  );
};

export default ExerciseList;
