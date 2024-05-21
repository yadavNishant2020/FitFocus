import React from 'react';
import {View, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

const SearchBar = ({value, onChangeText}: any) => {
  return (
    <View style={tw`flex-row items-center bg-[#1f293788] rounded-lg`}>
      <MaterialCommunityIcons
        name="magnify"
        size={24}
        style={tw`ml-1 p-1 `}
      />
      <TextInput
        style={tw`flex-1 text-white text-lg`}
        placeholder="Search"
        placeholderTextColor="#6b717b"
        value={value}
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
};

export default SearchBar;
