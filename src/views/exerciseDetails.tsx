import {View, Text, Alert, Button, ScrollView} from 'react-native';
import React, {useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import tw from 'twrnc';

function getYouTubeVideoId(url: any) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match && match[1];
}

const ExerciseDetails = ({route}: {route: any}) => {
  const {exercise} = route.params;
  const videoId = getYouTubeVideoId(`${exercise.video_url}`);
  const [isInstructionsExtended, setInstructionsExtended] = useState(false);

  return (
    <ScrollView>
      <View style={tw`flex p-2`}>
        <View style={[tw` gap-1 mb-2 bg-white p-2 m-1 rounded-md`]}>
          <Text style={tw`text-black text-xl capitalize`}>{exercise.name}</Text>
          <Text style={tw`text-gray-500 capitalize`}>
            {exercise.muscle} | {exercise.equipment}
          </Text>
        </View>
        <View style={[tw` gap-1 mb-4 bg-white p-2 m-1 rounded-md`]}>
          <Text
            style={tw`text-gray-600 capitalize text-base`}
            numberOfLines={!isInstructionsExtended ? 6 : 0}>
            {exercise.instructions}
          </Text>
          <Text
            style={tw`text-gray-800 self-center font-bold`}
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
            onError={error => console.error('Video Error:', error)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ExerciseDetails;
