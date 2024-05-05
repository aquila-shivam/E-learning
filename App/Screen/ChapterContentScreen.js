import { View, Text, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services';

export default function ChapterContentScreen() {
  const params = useRoute().params;
  const navigation = useNavigation();

  const onChapterFinish = ()=>{
    MarkChapterCompleted(params.chapterId,params.userCourseRecordId).then(res=>{
        if(res){
          ToastAndroid.show('Congratulation!!!',ToastAndroid.LONG)
          navigation.goBack();
        }
    }).catch(error =>{
      console.log(error);
    })
  }

  return params.content && (
    <View>
      <Content content = {params.content}
        onChapterFinish={()=>onChapterFinish()}
      />
    </View>
  )
}