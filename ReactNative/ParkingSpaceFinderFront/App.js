import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {StackNavigator} from "./StackNavigator";
import Home from "./screens/Home";
// import { getTestApi, getTestCreateSpeech } from "./screens/AIRecommendation";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      {/* <StackNavigator /> */}
      <View style={styles.container}>
        <Text>
          WELCOME TO PARKING SPOT FINDER!
        </Text>
        <Home />
        <Button title='SEARCH NOW'/>
        <Button title='AIRecommendation' />
      </View>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
