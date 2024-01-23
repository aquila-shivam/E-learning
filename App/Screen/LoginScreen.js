import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Colors from '../Utils/Colors'
import google from '../../assets/images/googlelogo.png'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser"

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
 
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ flex:1}}>
      <View style={{
        backgroundColor:Colors.WHITE,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          color: Colors.BLACK,
          fontFamily:'outfit-bold',
          fontSize:32
        }}>
          E-learning
        </Text>
      </View>

      <View style={{
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        flex:1,
        alignItems:'center',
      }}>
        <Text style={{
          color: Colors.LIGHT_PRIMARY,
          fontFamily:'outfit',
          fontSize:22,
          marginTop:50
        }}>
          Your Ultimate Learning Platform
        </Text>
        <TouchableOpacity 
        onPress={onPress}
        style={{
        flexDirection:'row', 
        backgroundColor:Colors.WHITE,
        justifyContent:'center',
        alignItems:'center',
        gap:10,
        padding:10,
        borderRadius:99,
        marginTop:50
        }}>
        <Image source={google}
          style={{width:40,height:40}}
        />
        <Text style={{fontSize:20,fontFamily:'outfit',color:Colors.PRIMARY}}>
          Sign In with Google
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

