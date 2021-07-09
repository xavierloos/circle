import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, Animated } from 'react-native'
import { Avatar, Icon, Button, Text } from 'react-native-elements'
import { auth } from '../firebase'

const ProfileScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false)

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
          useNaiveDriver: true,
        }).start()
      } else {
        setTimeout(() => setShowModal(false), 200)
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNaiveDriver: true,
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

  return (
    <View style={styles.container}>
      {console.log(auth?.currentUser)}
      <Avatar size={100} rounded source={{ uri: auth?.currentUser?.photoURL }} />
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='user'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>{auth?.currentUser?.displaySurname}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='envelope'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>{auth?.currentUser?.email}</Text>
      </View>
      <Button raised title="Edit user" containerStyle={styles.button} onPress={() => setVisible(true)} />
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <Text h4>Edit user</Text>
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
        </View>
      </ModalPoup>
      <Button raised title="Logout" type="outline" containerStyle={styles.button} onPress={logout} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "white"
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10
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
