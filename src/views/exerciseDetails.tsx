import { View, Text, Alert, Button, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import tw from 'twrnc';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function getYouTubeVideoId(url: any) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match && match[1];
}

const ExerciseDetails = ({ route }: { route: any }) => {
  const { exercise } = route.params;
  const videoId = getYouTubeVideoId(`${exercise.video_url}`);
  const [isInstructionsExtended, setInstructionsExtended] = useState(false);

  useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isInstructionsExtended]);

  return (
    <ScrollView>
      <View style={tw`flex p-2`}>
        <View style={[tw`gap-1 mb-2 bg-white p-2 m-1 rounded-md`]}>
          <Text style={tw`text-black text-xl capitalize`}>{exercise.name}</Text>
          <Text style={tw`text-gray-500 capitalize`}>
            {exercise.muscle} | {exercise.equipment}
          </Text>
        </View>
        <View style={[tw`gap-1 mb-4 bg-white p-2 m-1 rounded-md`]}>
          <Text
            style={tw`text-gray-600 capitalize text-base leading-7`}
            numberOfLines={!isInstructionsExtended ? 6 : undefined}>
            {exercise.instructions}
          </Text>
          <Text
            style={tw`text-gray-800 self-center font-bold py-1`}
            onPress={() => {
              setInstructionsExtended(!isInstructionsExtended);
            }}>
            {!isInstructionsExtended ? `See More...` : `See Less`}
          </Text>
        </View>

        <View style={tw`bg-white p-2 m-1 rounded-md z-10`}>
          <YoutubePlayer
            height={200}
            width={320}
            play={false}
            videoId={videoId}
            onError={(error) => console.error('Video Error:', error)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ExerciseDetails;
