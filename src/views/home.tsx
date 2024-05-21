import {View, Text, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import SearchBar from '../reusableComponents/searchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../reusableComponents/card';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
            <View
              style={[
                tw`bg-[#1f293788] flex-1 rounded-md justify-center items-center`,
              ]}>
              <Ionicons
                name="footsteps"
                size={30}
                style={tw`pb-6 text-[#6c93bd]`}
              />
              <Text style={[tw`text-2xl font-bold text-white`]}>3000</Text>
              <Text style={[tw``]}>Steps</Text>
            </View>
            <View style={[tw`flex-1 gap-2`]}>
              <View
                style={[
                  tw`bg-[#1f293788] flex-1 rounded-md justify-center items-center flex-row `,
                ]}>
                <MaterialCommunityIcons
                  name="fire"
                  size={30}
                  style={tw`text-[#6c93bd] pr-2`}
                />
                <Text style={[tw`text-2xl font-bold text-white`]}>240</Text>
                <Text style={[tw``]}>/kcal</Text>
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
              <View style={tw`flex-row gap-1`}>
                <Text style={tw` `}>See All</Text>
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  size={18}
                  style={tw` `}
                />
              </View>
            </View>
            <View></View>
            <View>
              <Card
                imageSource={
                  'https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2017/10/bodybuilder-dumbbells-gym-1280.jpg?quality=86&strip=all'
                }
                Title={'Full Body Exercises'}
              />
              <Card
                imageSource={
                  'https://hips.hearstapps.com/hmg-prod/images/chest-workout-with-cables-royalty-free-image-519935519-1558452745.jpg?crop=1.00xw:0.751xh;0,0.174xh&resize=640:*'
                }
                Title={'Chest Exercises'}
              />
              <Card
                imageSource={
                  'https://149874912.v2.pressablecdn.com/wp-content/uploads/2023/11/Leg-Day-Workout.jpg'
                }
                Title={'Lower Body Exercises'}
              />
              <Card
                imageSource={
                  'https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2016/09/Bodybuilder-Working-Out-His-Upper-Body-With-Cable-Crossover-Exercise.jpg?quality=86&strip=all'
                }
                Title={'Upper Body Exercises'}
              />
              <Card
                imageSource={
                  'https://barbend.com/wp-content/uploads/2023/02/Barbend-Featured-Image-1600x900-A-person-performing-cable-biceps-curls.jpg'
                }
                Title={'Biceps Exercises'}
              />
              <Card
                imageSource={
                  'https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/12/arms-triceps-gym-cable-machine.jpg?w=1300&h=731&crop=1&quality=86&strip=all'
                }
                Title={'Triceps Exercises'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;
