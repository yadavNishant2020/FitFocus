import {View, Text, Alert, Button} from 'react-native';
import React, {useCallback, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import tw from 'twrnc';

function getYouTubeVideoId(url: any) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match && match[1];
}

const ExerciseDetails = ({route}: {route: any}) => {
  const {exercise} = route.params;
  const videoId = getYouTubeVideoId(`${exercise.video_url}`);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  return (
    <View style={tw`flex justify-center items-center bg-gray-800 h-full`}>
      <Text>Name: {exercise.name}</Text>
      <Text>Type: {exercise.type}</Text>
      <Text>Muscle: {exercise.muscle}</Text>
      <Text>Equipment: {exercise.equipment}</Text>
      <Text>Difficulty: {exercise.difficulty}</Text>
      <Text>Instructions: {exercise.instructions}</Text>
      <View style={tw` z-10`}>
      <YoutubePlayer
        height={200}
        width={280}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
        onError={(error) => console.error('Video Error:', error)}
      />
      <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
      </View>
    </View>
  );
};

export default ExerciseDetails;
