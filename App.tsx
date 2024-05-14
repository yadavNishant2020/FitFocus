import React from 'react'
import { View, Text } from 'react-native'
import tw from 'twrnc';
import exercises from './assets/data/exercises.json'

const App = () => {
  // console.log(exercises[0]);
    return (
    <View style={tw`flex justify-center  bg-gray-200 h-full`}>
      <View style={tw`bg-white p-2 m-2 rounded-md gap-1`}>
      <Text style={tw`text-black text-lg capitalize`}>{exercises[0].name}</Text>
      <Text style={tw`text-gray-400 capitalize`}>{exercises[0].muscle} | {exercises[0].equipment}</Text>
      </View>
    </View>
  )
}

export default App