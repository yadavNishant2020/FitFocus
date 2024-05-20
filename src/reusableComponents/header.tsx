import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({exercise, onPressInfo, style}: any) => {
  return (
    <View
      style={[
        tw`gap-1 mb-2 bg-white p-2 m-1 rounded-md flex-row justify-between items-center`,
      ]}>
      <View
        style={[
          tw`${style}`,
        ]}>
        <Text style={tw`text-black text-xl capitalize max-w-72`}>{exercise.name}</Text>
        <Text style={tw`text-gray-500 capitalize`}>
          {exercise.muscle} | {exercise.equipment}
        </Text>
      </View>
      {onPressInfo && (
        <TouchableOpacity onPress={onPressInfo}>
          <MaterialCommunityIcons
            name="information"
            size={35}
            style={tw`text-gray-700`}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
