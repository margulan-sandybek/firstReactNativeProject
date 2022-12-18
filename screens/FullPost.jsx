import axios from 'axios'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { Loading } from '../components/Loading'

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`

export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState()
  const { id, title } = route.params

  React.useEffect(() => {
    navigation.setOptions({
      title
    })
    axios
      .get('https://639eb3e63542a261305ff710.mockapi.io/margulData/articles/' + id)
      .then(({ data }) => {
        setData(data)
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Ошибка', 'Не получилось получить статью')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    )
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri: data.imageUrl }} />
      <PostText>
        {data.text}
      </PostText>
    </View>
  )
}