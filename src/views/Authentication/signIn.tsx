import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { auth } from '../../auth/firebaseConfig'; // Import the configured Firebase auth instance

const SignInScreen = ({ navigation }:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // Firebase authentication
    auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        // Clear the form fields
        setEmail('');
        setPassword('');
        // Navigate to Home screen or any other screen
        navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View>
      <Text>Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

export default SignInScreen;
