// src/SignupScreen.js
import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {auth} from '../../auth/firebaseConfig'; // Import the configured Firebase auth instance
import tw from 'twrnc';

const SignupScreen = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'User account created!');
      navigation.navigate('Sign Up');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-4 bg-black`}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>Sign Up</Text>

      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignupScreen;
