import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';

const WorkoutLogger = ({route}: {route: any}) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

  const {exercise} = route.params;

  const handleWeightChange = (text: string) => {
    setWeight(text);
  };
  const handleRepsChange = (text: string) => {
    setReps(text);
  };
  const handleCommentChange = (text: string) => {
    setComment(text);
  };
  const handleComplete = () => {
    const newSet = {
      weight: weight,
      reps: reps,
      comment: comment,
    };
    setSets([...sets, newSet]);
    setWeight('');
    setReps('');
    setComment('');
    setIsCommentBoxOpen(false);
  };

  return (
    <>
      <View>
        <View style={[tw`gap-1 mb-2 bg-white p-2 m-1 rounded-md`]}>
          <Text style={tw`text-black text-xl capitalize`}>{exercise.name}</Text>
          <Text style={tw`text-gray-500 capitalize`}>
            {exercise.muscle} | {exercise.equipment}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={[tw`gap-2 mb-2 m-1 rounded-md`]}>
          <View style={[tw`bg-white p-2 rounded-md`]}>
            <Text style={tw`text-gray-800 capitalize pl-2`}>Today</Text>
            {sets.length > 0 ? (
              sets.map((set, index) => (
                <View
                  key={index}
                  style={tw`flex-row items-center justify-between p-2`}>
                  <View style={tw`flex-row items-center gap-4`}>
                    <Text
                      style={[
                        tw`text-white capitalize text-lg bg-gray-600 rounded-full w-10 h-10 text-center `,
                        {lineHeight: 40},
                      ]}>
                      {index + 1}
                    </Text>
                    <View>
                      <Text style={tw`text-gray-700 capitalize text-lg `}>
                        {set.weight
                          ? `${set.weight} Kg X ${set.reps} Reps`
                          : `Set ${index + 1}`}
                      </Text>
                      <Text style={tw`text-gray-500 capitalize `}>
                        {set.comment}
                      </Text>
                    </View>
                  </View>
                  <Text style={tw`text-gray-700 capitalize text-lg`}>!</Text>
                </View>
              ))
            ) : (
              <>
                <View style={tw`flex-row items-center justify-between p-2`}>
                  <View style={tw`flex-row items-center gap-4`}>
                    <Text
                      style={[
                        tw`text-white capitalize text-lg bg-gray-600 rounded-full w-10 h-10 text-center `,
                        {lineHeight: 40},
                      ]}>
                      1
                    </Text>
                    <Text style={tw`text-gray-700 capitalize text-lg `}>
                      Set 1
                    </Text>
                  </View>
                  <Text style={tw`text-gray-700 capitalize text-lg`}>!</Text>
                </View>
                <View style={tw`flex-row items-center justify-between p-2`}>
                  <View style={tw`flex-row items-center gap-4`}>
                    <Text
                      style={[
                        tw`text-white capitalize text-lg bg-gray-600 rounded-full w-10 h-10 text-center `,
                        {lineHeight: 40},
                      ]}>
                      2
                    </Text>
                    <Text style={tw`text-gray-700 capitalize text-lg `}>
                      Set 2
                    </Text>
                  </View>
                  <Text style={tw`text-gray-700 capitalize text-lg`}>!</Text>
                </View>
                <View style={tw`flex-row items-center justify-between p-2`}>
                  <View style={tw`flex-row items-center gap-4`}>
                    <Text
                      style={[
                        tw`text-white capitalize text-lg bg-gray-600 rounded-full w-10 h-10 text-center `,
                        {lineHeight: 40},
                      ]}>
                      3
                    </Text>
                    <Text style={tw`text-gray-700 capitalize text-lg `}>
                      Set 3
                    </Text>
                  </View>
                  <Text style={tw`text-gray-700 capitalize text-lg`}>!</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {isCommentBoxOpen ? (
        <TextInput
          style={[
            tw`gap-1 mb-2 bg-white p-2 m-1 rounded-md text-gray-700 `,
            {elevation: 4},
          ]}
          value={comment}
          onChangeText={handleCommentChange}
          placeholder="Please write your comment."
          placeholderTextColor={'#374151'}
        />
      ) : null}

      <View style={[tw`gap-1 flex-row justify-evenly bg-white p-2 pb-0`]}>
        <View style={tw`p-1 w-1/2 h-3/5`}>
          <Text style={tw`text-gray-700`}>Weight(Kg)</Text>
          <TextInput
            style={tw`border-b-2 border-gray-600 text-gray-700`}
            value={weight}
            onChangeText={handleWeightChange}
            keyboardType="numeric"
          />
        </View>
        <View style={tw`p-1 w-1/2 h-3/5`}>
          <Text style={tw` text-gray-700`}>Repetitions</Text>
          <TextInput
            style={tw`border-b-2 border-gray-600 text-gray-700 `}
            value={reps}
            onChangeText={handleRepsChange}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={[tw`gap-1 flex-row justify-evenly bg-white p-2 pt-0`]}>
        <TouchableOpacity
          onPress={() => setIsCommentBoxOpen(!isCommentBoxOpen)}
          activeOpacity={0.9}
          style={tw`p-1 bg-gray-500 w-1/2 h-12 rounded-full justify-center items-center`}>
          <Text style={tw` text-white`}>
            {isCommentBoxOpen ? 'Remove Comment' : 'Add Comment'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleComplete}
          style={tw`p-1 bg-gray-700 w-1/2 h-12 rounded-full justify-center items-center`}>
          <Text style={tw` text-white`}>Complete</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default WorkoutLogger;
