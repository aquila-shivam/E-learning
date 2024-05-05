import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import Colors from '../../Utils/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ContentItem({ description, output }) {
  const { width } = useWindowDimensions();
  const [isRun, setIsRun] = useState(false);
  const descriptionSource = {
    html: description
  }

  const outputSource = {
    html: output
  }
  return description && (
    <View>
      {/* <Text>{description}</Text> */}
      <RenderHtml
        contentWidth={width}
        source={descriptionSource}
        tagsStyles={tagsStyles}
      />
      {output != null ? <TouchableOpacity
        onPress={()=>setIsRun(true)}
        style={{ marginBottom: 20 }}>
        <Text style={{
          padding: 12,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 10, fontFamily: 'outfit',
          fontSize: 15, color: Colors.WHITE,
          textAlign: 'center', width: 100
        }}>Run</Text>
      </TouchableOpacity> : null}
      {isRun ? <>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 17, marginBottom: 20
        }}>Output</Text>
        <RenderHtml
          contentWidth={width}
          source={outputSource}
          tagsStyles={outputStyles}
        />
      </> : null}

    </View>
  )
}


const tagsStyles = {
  body: {
    fontFamily: 'outfit',
    fontSize: 16,
    marginBottom: 10
  },
  code: {
    backgroundColor: Colors.BLACK,
    color: Colors.WHITE,
    padding: 20,
    borderRadius: 15
  }

}

const outputStyles = {
  body: {
    fontFamily: 'outfit',
    fontSize: 17,
    backgroundColor: Colors.BLACK,
    borderRadius: 15,
    color: Colors.WHITE,
    padding: 20,
  },

}