import { View, Text, TouchableOpacity,ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { ScrollView } from 'react-native-gesture-handler';
import { useUser } from '@clerk/clerk-expo';
import { enrolledCourse,getUserEnrolledCourse } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';

export default function CourseDetailScreen() {
  const [userEnrolledCourse,setUserEnrolledCourse] = useState([]);
  const navigate = useNavigation();
  const params = useRoute().params;
  const {user} = useUser();

  const {isChapterComplete} = useContext(CompleteChapterContext);


  useEffect(() =>{
    if(user && params.course)
    {
      GetUserEnrolledCourse();
    }
  },[params.course,user])


  useEffect(()=>{
    isChapterComplete && GetUserEnrolledCourse();
  },[isChapterComplete])


  const UserEnrollCourse = () =>{
    enrolledCourse(params.course.id,user.primaryEmailAddress.emailAddress).then(res =>{
      if(res)
      {
        ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
        GetUserEnrolledCourse();
      }
    });
  }

  const GetUserEnrolledCourse = () =>{
    getUserEnrolledCourse(params.course.id,user.primaryEmailAddress.emailAddress)
    .then(res =>{
      setUserEnrolledCourse(res.userEnrolledCourses);
    });
  }
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <DetailSection 
        course={params.course}
        userEnrolledCourse = {userEnrolledCourse} 
        enrollCourse={()=>UserEnrollCourse()}
         />
        <ChapterSection chapterList={params.course.chapters}
         userEnrolledCourse = {userEnrolledCourse}
         />
      </View>
    </ScrollView>
  )
}