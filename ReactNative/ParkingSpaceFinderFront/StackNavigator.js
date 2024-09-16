import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './screens/Home';

//const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Group>
        <Stack.Screen name="Home" component= {Home}/>
    </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator