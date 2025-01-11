import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import SubHeading from '../SubHeading'
import Colors from '../../Utils/Colors'
import { GetAllUserProgressCourses } from '../../Services'
import { useUser } from '@clerk/clerk-expo'
import { FlatList } from 'react-native-gesture-handler'
import CourseItem from './CourseItem'
import { useNavigation } from '@react-navigation/native'

export default function CourseProgress() {

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
            <SubHeading text={"In Progress"} color={Colors.WHITE} />

            <FlatList
                data={progressCourseList}
                key={progressCourseList.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('course-detail', {
                    course: item.course
                    })}
                    >
                        <CourseItem item={item.course}
                         completedChapter={item.completedChapter?.length}
                         />
                    </TouchableOpacity>

                )}

            />

        </View>
    )
}