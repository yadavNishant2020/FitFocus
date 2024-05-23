import {StyleSheet, Text, View} from 'react-native';

type ValueProps = {
  label: string;
  value: string;
};

const Value = ({label, value}: ValueProps) => (
  <View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  label: {
    color: '#AFB3BE',
    fontSize: 15,
  },
  value: {
    fontSize: 25,
    color: 'white',
    fontWeight: '200',
    minWidth: 80
  },
});

export default Value;
