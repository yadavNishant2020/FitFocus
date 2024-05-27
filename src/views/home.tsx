import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import SearchBar from '../reusableComponents/searchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../reusableComponents/card';
import {useHealth} from '../hooks/health';
import cardData from '../assets/data/workoutPrograms.json';
import { ExerciseListProps } from '../interfaces';

const Home = ({navigation}:ExerciseListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    isInitialized,
    permissionsGranted,
    totalSteps,
    totalCalories,
    error,
    handleRequestPermission,
  } = useHealth();

  useEffect(() => {
    if (isInitialized && !permissionsGranted) {
      handleRequestPermission();
    }
  }, [isInitialized, permissionsGranted, handleRequestPermission]);

  return (
    <LinearGradient
      colors={['#000000', '#4B749F']}
      start={{x: 0.1, y: 0.1}}
      end={{x: 1, y: 1}}
      style={[tw`h-full`]}>
      <ScrollView>
        <View style={[tw`m-4 gap-4`]}>
          <View style={[tw`flex-row justify-between items-center`]}>
            <View>
              <Text style={[tw`text-base text-gray-400`]}>Welcome Back!</Text>
              <Text style={[tw`text-2xl font-bold text-white`]}>
                Nishant Yadav.
              </Text>
            </View>
            <Image
              source={{
                uri: 'https://avatars.githubusercontent.com/u/159749446?v=4',
              }}
              style={[tw`h-16 w-16 rounded-full`]}
            />
          </View>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          <View style={[tw`flex-row h-44 gap-2 `]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Steps')}
              style={[
                tw`bg-[#1f293788] flex-1 rounded-md justify-center items-center`,
              ]}>
              <Ionicons
                name="footsteps"
                size={30}
                style={tw`pb-6 text-[#6c93bd]`}
              />
              <Text style={[tw`text-2xl font-bold text-white`]}>
                {error ? 'N/A' : totalSteps}
              </Text>
              <Text style={[tw``]}>Steps</Text>
            </TouchableOpacity>
            <View style={[tw`flex-1 gap-2`]}>
              <View
                style={[
                  tw`bg-[#1f293788] flex-1 rounded-md justify-center items-center flex-row `,
                ]}>
                <MaterialIcons
                  name="local-fire-department"
                  size={30}
                  style={tw`text-[#6c93bd] pr-2`}
                />
                <Text style={[tw`text-2xl font-bold text-white`]}>
                  {error ? 'N/A' : totalCalories}
                </Text>
                <Text style={[tw``]}>/cal</Text>
              </View>
              <View
                style={[
                  tw`bg-[#1f293788] flex-1 rounded-md justify-center items-center flex-row `,
                ]}>
                <MaterialIcons
                  name="monitor-weight"
                  size={30}
                  style={tw`pr-2 text-[#6c93bd]`}
                />
                <Text style={[tw`text-2xl font-bold text-white`]}>72.3</Text>
                <Text style={[tw``]}>/kg</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={tw` text-white flex-row justify-between items-center`}>
              <Text style={tw`text-white text-lg font-bold`}>
                Workout Program
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Exercises', {showAll: true})
                }>
                <View style={tw`flex-row gap-1`}>
                  <Text>See All</Text>
                  <MaterialCommunityIcons name="arrow-top-right" size={18} />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  imageSource={card.imageSource}
                  Title={card.Title}
                  Muscle={card.Muscle}
                  navigation={navigation}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;
