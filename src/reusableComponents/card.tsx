import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const Card = ({imageSource, Title, navigation, Muscle}: any) => {
  return (
    <View style={tw`my-2 rounded-md overflow-hidden`}>
      <TouchableOpacity onPress={() => navigation.navigate('Exercises', { Muscle:`${Muscle}` })}>
        <ImageBackground
          source={{uri: `${imageSource}`}}
          style={tw`flex-row items-center h-34`}>
          <View style={tw`p-3 rounded bg-[#131920ad]`}>
            <Text style={tw`text-white text-2xl font-thin` }>{Title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
