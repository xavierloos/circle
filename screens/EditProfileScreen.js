import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth } from "../firebase"
import { Avatar } from 'react-native-elements'
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
      <View style={styles.content}>
        <Avatar size={100} rounded source={{ uri: auth?.currentUser?.photoURL }} />
      </View>
    </View>
  )
}

export default EditProfileScreen

 const styles = StyleSheet.create({})

