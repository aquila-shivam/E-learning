import { View, Text, FlatList,Image } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { GetAllUsers } from '../Services';
import Colors from '../Utils/Colors';

export default function LeaderBoard() {

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    GetAllUserDetails();
  }, [])

  const GetAllUserDetails = () => {
    GetAllUsers().then(res => {
      res && setUserList(res.userDetails);
    })
  }

  return (
    <View>
      <View style={{
        height: 160,
        backgroundColor: Colors.PRIMARY,
        padding: 30
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          color: Colors.WHITE,
        }}>
          LeaderBoard
        </Text>
      </View>
      <View>
        <FlatList
          data={userList}
          renderItem={({ item, index }) => (
            <View>
                <Image source = {{uri : item.profileImage}}
                  style={{
                    width : 60,
                    height: 60
                  }}
                />
            </View>
          )
          }
        />
      </View>
    </View>
  )
}