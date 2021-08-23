import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from "../firebase"
import { Avatar, Icon, Input, Button } from 'react-native-elements'

const EditProfileScreen = ({ navigation }) => {
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newAvatar, setNewAvatar] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Profile",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerBackTitle: "Cancel",
    });
  }, [navigation])

  const onChangePasswordPress = () => {
    reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser
        console.log(user)
        user.updatePassword(newPassword)
          .then(() => {
            Alert.alert("User details updated")
          }).catch((e) => {
            Alert.alert(e.message)
          })
      }).catch((e) => {
        Alert.alert(e.message)
      })

  }

  return (
    
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
          <Text>Edit profile</Text>
          <View style={{ alignItems: "center" }}>
            <View style={styles.content}>
              <Avatar size={100} rounded source={{ uri: auth?.currentUser?.photoURL }} />
            </View>
            <Input type="text" placeholder={auth?.currentUser?.displayName} value={newName} autoFocus autoCapitalize="none" leftIcon={<Icon name="user" type="font-awesome" size={30} color="#D50000" />} />
            <Input type="email" placeholder={auth?.currentUser?.email} value={newEmail} autoCapitalize="none" leftIcon={<Icon name="at" type="font-awesome" size={30} color="#D50000" />} keyboardType="email-address" />
            <Input type="text" placeholder="Profile picture URL" value={newAvatar} leftIcon={<Icon name="photo" type="font-awesome" size={30} color="#D50000" style={{ marginRight: 10 }} />} />
            <Input secureTextEntry type="password" placeholder="Current Password" autoCapitalize="none" leftIcon={<Icon name="lock" type="font-awesome" size={30} color="#D50000" />} value={currentPassword} onChangeText={(text) => setCurrentPassword(text)} />
            <Input secureTextEntry type="password" placeholder="New Password" autoCapitalize="none" leftIcon={<Icon name="star" type="font-awesome" size={30} color="#D50000" />} value={newPassword} onChangeText={(text) => setNewPassword(text)} />
            <Button raised title="Update user" type="outline" onPress={onChangePasswordPress} />
          </View>
        </View>
      </KeyboardAvoidingView>

  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: "white",

  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'baseline',
    // padding:5,
    // justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: 'baseline',
    justifyContent: 'center',
  },

  text: {
    fontWeight: "600",
    fontSize: 26,
    marginTop: 20
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: '100%',
    justifyContent: "space-between"
  }
})

