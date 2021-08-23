import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from "../firebase"
import { Avatar, Icon, Input } from 'react-native-elements'

const EditProfileScreen = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Profile",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerBackTitle: "Cancel",
    });
  }, [navigation])

  return (
    <View>
      <Text>Edit profile</Text>
      
    </View>
  )
}

export default EditProfileScreen

 const styles = StyleSheet.create({})

