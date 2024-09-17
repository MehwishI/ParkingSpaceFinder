import { View, Text, SafeAreaView, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      
        <Text>
          WELCOME TO PARKING SPOT FINDER!
        </Text>

        {/* <Button title='SEARCH NOW' /> */}
      <Button
        onPress={() => navigation.navigate("Second")}
        title="Go to Search Screen" />
    </SafeAreaView>
  )
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


export default Home