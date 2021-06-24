import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'

const ProfileScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "CIRCLE: Profile",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    })
  }, [])

  return (
    <View>
      
      <Avatar size={100} rounded source={{ uri: auth?.currentUser?.photoURL }} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
