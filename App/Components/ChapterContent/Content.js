import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native'
import ContentItem from './ContentItem'
import Colors from '../../Utils/Colors'
export default function Content({content,onChapterFinish}) {

  let contentRef;
  const [activeIndex,setActiveIndex] = useState(0);
  const onNextBtnPress=(index)=>{
    if(content?.length <= index+1)
    {
      onChapterFinish();
      return;
    }
    setActiveIndex(index+1)
    contentRef.scrollToIndex({animated:true,index:index+1})
  }


  return (
    <ScrollView style={{padding:0}}>
      <ProgressBar key={activeIndex} contentLength = {content?.length} contentIndex={activeIndex}/>
      <FlatList
        data={content}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={(ref)=>(contentRef=ref)}
        renderItem={({item,index})=>(
          <View style={{width:Dimensions.get('screen').width , padding:20}}>
              <Text style={{
                fontFamily:'outfit-medium',
                fontSize:22,
                marginBottom:15
              }}>{item.heading}</Text>
              <ContentItem 
              description = {item?.description?.html}
              output={item?.output?.html}
              />

              <TouchableOpacity 
              style={{marginTop:10}}
              onPress={()=>onNextBtnPress(index)}>
                <Text style={{
                  padding:15,
                  backgroundColor:Colors.PRIMARY,
                  color:Colors.WHITE,
                  borderRadius:10,
                  textAlign:'center',
                  fontSize:17,
                  fontFamily:'outfit',
                }}>
                  {content?.length > index+1 ? 'Next' : 'Finish'}
                </Text>
              </TouchableOpacity>
          </View>
        )}
      />


    </ScrollView>
  )
}