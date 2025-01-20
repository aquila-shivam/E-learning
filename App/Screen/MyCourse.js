import { View, Text , FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Utils/Colors'
import { GetAllUserProgressCourses } from '../Services';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import CourseProgressItem from '../Components/MyCourse/CourseProgressItem';

export default function MyCourse() {

  const { user } = useUser();
  const navigation = useNavigation();
  const [progressCourseList, setProgressCourseList] = useState([]);
  useEffect(() => {
    user && GetAllProgressCourseList();
  }, [user]);
  const GetAllProgressCourseList = () => {
    GetAllUserProgressCourses(user.primaryEmailAddress.emailAddress).then(res => {
      setProgressCourseList(res?.userEnrolledCourses);
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
          My Course
        </Text>
      </View>

      <FlatList
        data={progressCourseList}
        key={progressCourseList.id}
        style={{marginTop:-50}}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{margin:8,padding:5}}
            onPress={() => navigation.navigate('course-detail', {
              course: item.course
            })}
          >
            <CourseProgressItem item={item.course}
              completedChapter={item.completedChapter?.length}
            />
          </TouchableOpacity>

        )}
      />

    </View>
  )
}