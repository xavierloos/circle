import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

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

// const styles = StyleSheet.create({})

