import React from 'react';
import { View, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import tw from 'twrnc';
import { useStepCounter } from '../reusableComponents/health';
import Value from '../reusableComponents/value';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const STEPS_GOAL = 10000;
const CALORIES_GOAL = 3000;

const Steps = () => {
  const { totalSteps, totalCalories } = useStepCounter();

  const stepsProgress = totalSteps / STEPS_GOAL;
  const caloriesProgress = totalCalories / CALORIES_GOAL;

  const data = {
    labels: ['Steps', 'Calories'],
    data: [ caloriesProgress, stepsProgress],
  };

  const chartConfig = {
    backgroundGradientFrom: '#000000',
    backgroundGradientTo: '#00000',
    backgroundGradientFromOpacity: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 16,
  };

  return (
    <LinearGradient
      colors={['#000000', '#4B749F']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={tw`h-full`}
    >
      <View style={tw`flex-1 items-center`}>
        <ProgressChart
          data={data}
          width={screenWidth}
          height={220}
          radius={40}
          chartConfig={chartConfig}
          hideLegend={false}
          style={{ borderRadius: 20, marginLeft: -60 }} 
        />
        <View style={tw`flex-row gap-25 flex-wrap mt-8 p-5`}>
          <Value label="Steps" value={totalSteps.toString()} />
          <Value
            label="Distance"
            value={`${(totalCalories / 1000).toFixed(2)} km`}
          />
          <Value label="Calories Burned" value={totalCalories.toString()} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Steps;
