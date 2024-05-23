import React, {useState, useEffect} from 'react';
import {View, Dimensions, Text, TouchableOpacity} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import tw from 'twrnc';
import {useHealth} from '../hooks/health';
import Value from '../reusableComponents/value';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addDays, format, isToday, isYesterday} from 'date-fns';

const screenWidth = Dimensions.get('window').width;

const STEPS_GOAL = 2000;
const CALORIES_GOAL = 3000;
const DISTANCE_GOAL = 10;

const Steps = () => {
  const {totalSteps, totalCalories, totalFloorsClimed, handleReadRecords} = useHealth();
  const stepsProgress = totalSteps / STEPS_GOAL;
  const caloriesProgress = totalCalories / CALORIES_GOAL;
  const totalDistance: any = (totalCalories / 1000).toFixed(2);
  const distanceProgress = totalDistance / DISTANCE_GOAL;

  const data = {
    labels: ['Calories', 'Steps', 'Distance'],
    data: [caloriesProgress, stepsProgress, distanceProgress],
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    propsForLabels: {
      fill: '#AFB3BE',
    },
    color: (opacity = 1, index:any) => {
      const colors = [
        `rgba(3, 174, 210, ${opacity})`,
        `rgba(255, 193, 0, ${opacity})`,
        `rgba(199, 54, 89, ${opacity})`,
      ];
      return colors[index];
    },
    strokeWidth: 26,
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    let interval:any;
    if (isToday(selectedDate)) {
      interval = setInterval(() => {
        fetchData(new Date());
      }, 20000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedDate]);


  const fetchData = async (date: Date) => {
    await handleReadRecords(date);
  };

  const handlePrevDate = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prevDate);
  };

  const handleNextDate = () => {
    if (!isToday(selectedDate)) {
      const nextDate = addDays(selectedDate, 1);
      setSelectedDate(nextDate);
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#4B749F']}
      start={{x: 0.1, y: 0.1}}
      end={{x: 1, y: 1}}
      style={tw`h-full py-4`}>
      <View style={tw`flex-1 items-center`}>
        <ProgressChart
          data={data}
          width={screenWidth}
          height={220}
          radius={40}
          chartConfig={chartConfig}
          hideLegend={false}
          style={{borderRadius: 20, marginLeft: -50}}
        />
        <View style={tw`flex-row gap-15 p-5 justify-evenly flex-wrap mt-8 `}>
          <View style={tw`flex-row items-center gap-3 justify-center`}>
            <Ionicons name="footsteps" size={30} style={tw`text-[#6c93bd]`} />
            <Value label="STEPS" value={totalSteps.toString()} />
          </View>
          <View style={tw`flex-row items-center gap-3 justify-center`}>
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={30}
              style={tw`text-[#6c93bd] pr-2`}
            />
            <Value
              label="KM"
              value={`${(totalCalories / 1000).toFixed(2)} km`}
            />
          </View>
          <View style={tw`flex-row items-center gap-3 justify-center`}>
            <MaterialIcons
              name="local-fire-department"
              size={30}
              style={tw`text-[#6c93bd]`}
            />
            <Value label="CAL" value={totalCalories.toString()} />
          </View>
          <View style={tw`flex-row items-center gap-3 justify-center`}>
            <MaterialCommunityIcons
              name="stairs-up"
              size={30}
              style={tw`text-[#6c93bd]`}
            />
            <Value label="FLOORS" value={totalFloorsClimed.toString()} />
          </View>
        </View>
        <View style={tw`my-20 flex-row w-full justify-evenly`}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="arrow-left"
              color="white"
              size={20}
              onPress={handlePrevDate}
            />
          </TouchableOpacity>
          <Text style={tw`text-2xl text-white font-bold`}>
            {isToday(selectedDate)
              ? 'Today'
              : isYesterday(selectedDate)
              ? 'Yesterday'
              : format(selectedDate, 'MMMM d')}
          </Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="arrow-right"
              color="white"
              size={20}
              onPress={handleNextDate}
            />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Steps;
