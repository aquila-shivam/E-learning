import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { ScrollView } from 'react-native-gesture-handler';
import { useUser } from '@clerk/clerk-expo';
import { enrolledCourse } from '../Services';

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;
  const {user} = useUser();
  useEffect(() => {
    console.log(params.course);
  }, [params.course])

  const UserEnrolledCourse = () =>{
    enrolledCourse(params.course.id,user.primaryEmailAddress.emailAddress).then(res =>{
      console.log(res);
    });
  }

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <DetailSection course={params.course} enrollCourse={()=>UserEnrolledCourse()} />
        <ChapterSection chapterList={params.course.chapters} />
      </View>
    </ScrollView>
  )
}