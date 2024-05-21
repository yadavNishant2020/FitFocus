import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import tw from 'twrnc';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '../reusableComponents/header';
import LinearGradient from 'react-native-linear-gradient';

type RootStackParamList = {
  WorkoutLogger: {exercise: any};
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function getYouTubeVideoId(url: any) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match && match[1];
}

const ExerciseDetails = ({route}: {route: any}) => {
  const {exercise} = route.params;
  const videoId = getYouTubeVideoId(exercise.video_url);
  const [isInstructionsExtended, setInstructionsExtended] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isInstructionsExtended]);

  return (
    <LinearGradient
      colors={['#000000', '#4B749F']}
      start={{x: 0.1, y: 0.1}}
      end={{x: 1, y: 1}}
      style={[tw`h-full`]}>
      <ScrollView>
        <View style={tw`flex p-2`}>
          <Header exercise={exercise} />
          <View style={[tw`gap-1 mb-4 bg-[#1f293788] p-2 m-1 rounded-md`]}>
            <Text
              style={tw`text-gray-200 capitalize text-base leading-7`}
              numberOfLines={!isInstructionsExtended ? 6 : undefined}>
              {exercise.instructions}
            </Text>
            <Text
              style={tw`text-gray-200 self-center font-bold py-1`}
              onPress={() => {
                setInstructionsExtended(!isInstructionsExtended);
              }}>
              {!isInstructionsExtended ? `See More...` : `See Less`}
            </Text>
          </View>

          <View style={tw`bg-[#1f293788] p-2 m-1 rounded-md z-10`}>
            <YoutubePlayer
              height={200}
              width={320}
              play={false}
              videoId={videoId}
              onError={error => console.error('Video Error:', error)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('WorkoutLogger', {exercise})}>
            <View style={tw`bg-gray-900 p-2 m-1 rounded-md z-10`}>
              <Text style={tw`text-white self-center font-bold py-1 text-lg `}>
                Workout Logger
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ExerciseDetails;
