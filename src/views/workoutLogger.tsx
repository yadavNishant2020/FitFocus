import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import tw from 'twrnc';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {retrieveSetData, storeSetData} from '../services/storage.services';
import Header from '../reusableComponents/header';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const WorkoutLogger = ({route, navigation}: {route: any; navigation: any}) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [isProgressBoxOpen, setIsProgressBoxOpen] = useState(true);
  const [visibleDropdown, setVisibleDropdown] = useState<number | null>(null);

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

  const handleInfoPress = () => {
    navigation.navigate('ExerciseDetails', {exercise});
  };

  useEffect(() => {
    const fetchSetData = async () => {
      const storedSetData = await retrieveSetData(exercise.name);
      setSets(storedSetData);
    };
    fetchSetData();
  }, [exercise.name]);

  useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isProgressBoxOpen]);

  const demoData = [
    {date: 'Feb-15', weight: 55, reps: 10},
    {date: 'Feb-16', weight: 60, reps: 10},
    {date: 'Feb-17', weight: 70, reps: 10},
    {date: 'Feb-18', weight: 65, reps: 10},
    {date: 'Feb-19', weight: 68, reps: 10},
  ];

  const chartData = {
    labels: demoData.map(set => set.date),
    datasets: [
      {
        data: demoData.map(set => set.weight * set.reps),
        strokeWidth: 2,
      },
    ],
  };

  const handleUpdateSet = (index: number) => {
    setWeight(sets[index].weight);
    setReps(sets[index].reps);
    setComment(sets[index].comment);

    const updatedSets = sets.map((set, i) =>
      i === index ? {...set, isUpdating: true} : {...set, isUpdating: false},
    );

    setSets(updatedSets);
    setVisibleDropdown(null);
  };

  const handleComplete = async () => {
    if (!weight || !reps) {
      Alert.alert('Invalid Input', 'Please enter both weight and reps.');
      return;
    }

    const newSet = {weight, reps, comment, isUpdating: false};
    let updatedSets: any;

    const isUpdatingSet = sets.some(set => set.isUpdating);

    if (isUpdatingSet) {
      updatedSets = sets.map(set =>
        set.isUpdating ? newSet : {...set, isUpdating: false},
      );
    } else {
      updatedSets = [...sets, newSet];
    }

    setSets(updatedSets);
    await storeSetData(exercise.name, updatedSets);

    setWeight('');
    setReps('');
    setComment('');
    setIsCommentBoxOpen(false);
    setVisibleDropdown(null);
  };

  const handleDeleteSet = (index: number) => {
    const newSets = sets.filter((_, i) => i !== index);
    setSets(newSets);
    setVisibleDropdown(null);
  };

  return (
    <>
      <LinearGradient
        colors={['#000000', '#4B749F']}
        start={{x: 0.1, y: 0.1}}
        end={{x: 1, y: 1}}
        style={[tw`h-full`]}>
        <View>
          <Header exercise={exercise} onPressInfo={handleInfoPress} />
        </View>

        <ScrollView>
          <View style={[tw`gap-1 mb-2 bg-[#1F2937] p-4 m-1 rounded-md`]}>
            <View style={tw`flex-row justify-between items-center`}>
              <Text
                style={tw`text-white pb-4`}
                onPress={() => setIsProgressBoxOpen(!isProgressBoxOpen)}>
                Progress
              </Text>
              <View style={tw`text-white pb-4`}>
                {isProgressBoxOpen ? (
                  <Text
                    style={tw` text-xl w-6 h-6`}
                    onPress={() => setIsProgressBoxOpen(!isProgressBoxOpen)}>
                    <MaterialCommunityIcons
                      name="close"
                      color="white"
                      size={25}
                    />
                  </Text>
                ) : (
                  <Text
                    style={tw` text-3xl w-6 h-6`}
                    onPress={() => setIsProgressBoxOpen(!isProgressBoxOpen)}>
                    <MaterialCommunityIcons
                      name="plus"
                      color="white"
                      size={25}
                    />
                  </Text>
                )}
              </View>
            </View>
            {isProgressBoxOpen ? (
              <LineChart
                data={chartData}
                width={screenWidth - 25}
                height={220}
                chartConfig={{
                  backgroundColor: '#1F2937',
                  backgroundGradientFrom: '#1F2937',
                  backgroundGradientTo: '#1F2937',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
              />
            ) : null}
          </View>
          <View style={[tw`gap-2 mb-2 m-1 rounded-md`]}>
            <View style={[tw`bg-[#1f293788] p-2`]}>
              <Text style={tw`text-white capitalize pl-2`}>Today</Text>
              {sets.length > 0 ? (
                sets.map((set, index) => (
                  <View
                    key={index}
                    style={[
                      tw`flex-row items-center justify-between p-1 m-1`,
                      set.isUpdating && tw`bg-gray-300 `,
                    ]}>
                    <View style={tw`flex-row items-center gap-4`}>
                      <Text
                        style={[
                          tw`text-white capitalize text-lg bg-gray-600 rounded-full w-10 h-10 text-center `,
                          {lineHeight: 40},
                        ]}>
                        {index + 1}
                      </Text>
                      <View>
                        <Text style={tw`text-white capitalize text-lg pt-3`}>
                          {set.weight
                            ? `${set.weight} Kg X ${set.reps} Reps`
                            : `Set ${index + 1}`}
                        </Text>
                        <Text style={tw`text-white capitalize `}>
                          {set.comment}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={tw`text-gray-700 capitalize text-lg`}
                      onPress={() =>
                        setVisibleDropdown(
                          visibleDropdown === index ? null : index,
                        )
                      }>
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        color="white"
                        size={20}
                      />
                    </Text>
                    {visibleDropdown === index && (
                      <View
                        style={tw`absolute right-0 bg-white border rounded-md shadow-lg p-1 bottom-12 z-100`}>
                        <TouchableOpacity
                          onPress={() => handleUpdateSet(index)}
                          style={tw`p-2`}>
                          <Text style={tw`text-black`}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDeleteSet(index)}
                          style={tw`p-2`}>
                          <Text style={tw`text-black`}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))
              ) : (
                <View style={tw`p-2 self-center gap-2 items-center`}>
                  <MaterialCommunityIcons
                    name="dumbbell"
                    color="white"
                    size={25}
                  />
                  <Text style={tw`text-white text-lg`}>
                    Please add some set data.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {isCommentBoxOpen ? (
          <TextInput
            style={[
              tw`gap-1 mb-2 bg-gray-500 p-2 m-1 rounded-md text-white `,
              {elevation: 4},
            ]}
            value={comment}
            onChangeText={handleCommentChange}
            placeholder="Please write your comment here."
            placeholderTextColor={'#ffffff'}
          />
        ) : null}
        <View
          style={[tw`gap-1 flex-row justify-evenly bg-[#1f293788] p-2 pb-0`]}>
          <View style={tw`p-1 w-1/2 h-3/5`}>
            <Text style={tw`text-white`}>Weight(Kg)</Text>
            <TextInput
              style={tw`border-b-2 border-gray-600 text-white`}
              value={weight}
              onChangeText={handleWeightChange}
              keyboardType="numeric"
            />
          </View>
          <View style={tw`p-1 w-1/2 h-3/5`}>
            <Text style={tw` text-white`}>Repetitions</Text>
            <TextInput
              style={tw`border-b-2 border-gray-600 text-white`}
              value={reps}
              onChangeText={handleRepsChange}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View
          style={[tw`gap-1 flex-row justify-evenly bg-[#1f293788] p-2 pt-0`]}>
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
            style={tw`p-1 bg-gray-400 w-1/2 h-12 rounded-full justify-center items-center`}>
            <Text style={tw` text-black`}>Complete</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

export default WorkoutLogger;
