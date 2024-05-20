import { View, Text } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';

const Home = () => {
  return (
    <LinearGradient 
      colors={['#1F2937', '#4B749F']} 
      start={{ x: 0.1, y: 0.1 }} 
      end={{ x: 1, y: 1 }}
      style={[tw`h-full`]}
    >
      <View style={[tw`flex-1 justify-center items-center`]}>
        <Text style={[tw`text-white`]}>Home</Text>
      </View>
    </LinearGradient>
  );
}

export default Home;
