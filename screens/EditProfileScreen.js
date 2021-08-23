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
      <View style={{ alignItems: "center" }}>
        <View style={styles.header}>
          <Text h4><Icon style={styles.icon}
            name='pencil'
            type='font-awesome'
            color='#D50000' />Edit user</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={() => setVisible(false)} >
            <Icon style={styles.icon}
              name='times'
              type='font-awesome'
              color='#D50000' />
          </TouchableOpacity>
        </View>

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
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({})

