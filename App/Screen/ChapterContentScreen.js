import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';
import { ScrollView } from 'react-native-gesture-handler';
import { useUser } from '@clerk/clerk-expo';
import { UserPointContext } from '../Context/UserPointContext';

export default function ChapterContentScreen() {
  const params = useRoute().params;
  const navigation = useNavigation();
  const {setIsChapterComplete} = useContext(CompleteChapterContext);
  const {user} = useUser();
  const {userPoints} = useContext(UserPointContext);

  const onChapterFinish = ()=>{
    const totalPoints = Number(userPoints)+(params.content?.length*10);
    const chapterId = params.chapterId;
    const userCourseRecordId = params.userCourseRecordId;
    const userEmail = user.primaryEmailAddress.emailAddress;
    MarkChapterCompleted(chapterId,
      userCourseRecordId,
      userEmail,
      totalPoints).then(res=>{
        if(res){
          ToastAndroid.show('Congratulation!!!',ToastAndroid.LONG);
          setIsChapterComplete(true);
          navigation.goBack();
        }
    }).catch(error =>{
      console.log(error);
    })
  }

  return params.content && (
    <ScrollView>
      <Content content = {params.content}
        onChapterFinish={()=>onChapterFinish()}
      />
    </ScrollView>
  )
}