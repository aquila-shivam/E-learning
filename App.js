import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font'
import LoginScreen from './App/Screen/LoginScreen';
import { ClerkProvider,SignedIn,SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { CompleteChapterContext } from './App/Context/CompleteChapterContext';
import { UserPointContext } from './App/Context/UserPointContext';
import { useState } from 'react';

export default function App() {

    const [isChapterComplete,setIsChapterComplete] = useState(false);
    const [userPoints,setUserPoints] = useState(10);
  

    const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-light': require('./assets/fonts/Outfit-Light.ttf'),
    'outfit-semibold': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-extrabold': require('./assets/fonts/Outfit-ExtraBold.ttf'),
    'outfit-medium' : require('./assets/fonts/Outfit-Medium.ttf'),
  });


  if (!fontsLoaded) {
    return null;
  }
  return (
    <ClerkProvider publishableKey={"pk_test_cmVuZXdpbmctbWFsYW11dGUtMTIuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
      <StatusBar barStyle="dark-content"
        backgroundColor="#fff"/>
      <UserPointContext.Provider value={{userPoints,setUserPoints}}>
      <CompleteChapterContext.Provider value={{isChapterComplete,setIsChapterComplete}}>
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <LoginScreen/>
        </SignedOut>
      </View>
      </CompleteChapterContext.Provider>
      </UserPointContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:40
  },
});
