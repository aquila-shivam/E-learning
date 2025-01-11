import { View, Text,ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'
import CourseList from '../Components/HomeScreen/CourseList'
import { useUser } from '@clerk/clerk-expo'
import { createNewUser, getUserDetail } from '../Services'
import { UserPointContext } from '../Context/UserPointContext'
import CourseProgress from '../Components/HomeScreen/CourseProgress'


export default function HomeScreen() {
  
  const {user} = useUser();

  useEffect(()=>{
    user && createUser();
  },[user]);
 

  const {setUserPoints} = useContext(UserPointContext);

  const createUser = () => {
    if (user) {
      createNewUser(user.fullName,user.primaryEmailAddress.emailAddress, user.imageUrl)
        .then(res => {
          if (res) {
            getUser();
          } else {
            console.log("User already exist");
          }
        })
        .catch(error => {
          console.error("Error creating user:", error);
        });
    }
  };
  

  const getUser = ()=>{
    getUserDetail(user.primaryEmailAddress.emailAddress)
    .then(res=>{
      const point = res.userDetail?.point;
      setUserPoints(point);
    }).catch(error=>{
      console.log(error);
    })
  }

  return (
    <ScrollView>
      <View style={{backgroundColor:Colors.PRIMARY,
      height:250,
      padding:20}}>
        <Header />
      </View>

      <View style={{padding:20}}>
        <View style={{marginTop:-90}}>
          <CourseProgress/>
          <CourseList level ={'Basic'}/>
        </View>
        <CourseList level ={'Advance'}/>
      </View>
    </ScrollView>
  )
}