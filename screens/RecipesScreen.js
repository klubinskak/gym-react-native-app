import { View, Text } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'

const RecipesScreen = ({route}) => {
  return (
    <View>
      <Navbar route={route.name}/>
    </View>
  )
}

export default RecipesScreen