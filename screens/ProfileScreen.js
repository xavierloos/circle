import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, Animated, Alert } from 'react-native'
import { Avatar, Icon, Button, Text, Input } from 'react-native-elements'
import { auth } from '../firebase'
import firebase from "firebase"

const ProfileScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false)
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newAvatar, setNewAvatar] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "CIRCLE: Profile",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    })
  }, [])

  const logout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }

  const ModalPoup = ({ visible, children }) => {

    const [showModal, setShowModal] = useState(visible)
    const scaleValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
      toggleModal()
    }, [visible])

    var toggleModal = () => {
      if (visible) {
        setShowModal(true)
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start()
      } else {
        setTimeout(() => setShowModal(false), 200)
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start()
      }
    }
    return (<Modal transparent visible={showModal}>
      <View style={styles.modalBg}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>)
  }

  const reauthenticate = currentPassword => {
    var user = firebase.auth().currentUser
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
    return user.reauthenticateWithCredential(cred)
  }

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

    <View style={styles.container}>
      {console.log(auth?.currentUser)}
      <View style={styles.avatarContainer}>
        <Avatar size={100} rounded source={{ uri: auth?.currentUser?.photoURL }} />
      </View>

      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='user'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>{auth?.currentUser?.displayName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='envelope'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>{auth?.currentUser?.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='lock'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>Change password</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='phone'
          type='font-awesome'
          color='#D50000' />
        {auth?.currentUser?.phoneNumber === null && <>
          <Text style={styles.text}>Add telephone number</Text>
        </>}
        {auth?.currentUser?.phoneNumber !== null && <>
          <Text style={styles.text}>{auth?.currentUser?.email}</Text>
        </>}
      </View>

      <Button raised title="Edit user" containerStyle={styles.button} onPress={() => setVisible(true)} />
      <ModalPoup visible={visible}>
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
      </ModalPoup>
      <Button raised title="Logout" type="outline" containerStyle={styles.button} onPress={logout} />
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='info'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>About</Text>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'flex-start',
    // alignItems: 'center',
    padding: 10,
    backgroundColor: "white"
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
    fontSize: 18,
    marginTop: 20
  },
  button: {
    width: 100,
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
