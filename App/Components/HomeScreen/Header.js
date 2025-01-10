import { View, Text, Image, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import Coin from '../../../assets/images/coin.png'
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { UserPointContext } from '../../Context/UserPointContext';

export default function Header() {

  const { isLoaded, isSignedIn, user } = useUser();
  const {userPoints} = useContext(UserPointContext);

  return isLoaded && (
    <View>
      <View style={[{ justifyContent: 'space-between' }, styles.rowStyle]}>
        <View style={styles.rowStyle}>
          <Image source={{ uri: user?.imageUrl }}
            style={{ width: 50, height: 50, borderRadius: 99 }}
          />
          <View>
            <Text style={{ color: Colors.WHITE, fontFamily: 'outfit' }}>Welcome,</Text>
            <Text
              style={styles.mainText}>
              {user?.fullName}</Text>
          </View>
        </View>
        <View style={styles.rowStyle}>
          <Image source={Coin} style={{ width: 30, height: 35, borderRadius: 99 }} />
          <Text style={styles.mainText}>{userPoints}</Text>
        </View>
      </View>
      <View style={[{
        backgroundColor: Colors.WHITE,
        paddingLeft:20,paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
        marginTop:25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius:99,
      }]}>
        <TextInput placeholder='Search Courses' style={{ fontFamily: 'outfit', fontSize: 18 }} />
        <FontAwesome name="search" size={24} color='black' style={{marginTop:10,marginRight:10}}  />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  mainText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: 'outfit'
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  }

})
