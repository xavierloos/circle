import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, Animated, Alert } from 'react-native'
import { Avatar, Icon, Button, Text, Input } from 'react-native-elements'
import { auth } from '../firebase'
import firebase from "firebase"

const ProfileScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false)

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "CIRCLE: Profile",
  //     headerStyle: { backgroundColor: "#D50000" },
  //     headerTitleStyle: { color: "white" },
  //     headerTintColor: "white",
  //   })
  // }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: false,
      headerStyle: {
        backgroundColor: "#D50000", height: 115, borderRadius: 30, shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.5
      },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      // `headerRight: () => (
      //   <View style={{ marginRight: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      //     <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 5 }} onPress={() => navigation.navigate("Profile")}>
      //       {
      //         (auth?.currentUser?.photoURL === null) ? <SimpleLineIcons name="plus" size={24} color="white" /> : <Avatar size={60} rounded source={{ uri: auth?.currentUser?.photoURL }} />
      //       }
      //     </TouchableOpacity>
      //   </View>
      // ),`
      headerLeft: () => (
        <View style={{ marginLeft: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          {/* <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 5 }}>
            <SimpleLineIcons name="camera" size={24} color="white" />
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5} style={{ marginLeft: 5 }}>
            <SimpleLineIcons name="plus" size={24} color="white" />
          </TouchableOpacity> */}
          <View>
            <Text style={styles.headerTitle}>CIRCLE</Text>
            <Text style={styles.headerSubtitle}>Profile</Text>
          </View>
        </View>
      ),
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
        <Avatar size={250}
          squared
          activeOpacity={0.7}
          source={{ uri: auth?.currentUser?.photoURL }} />
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
          color='#D50000' /><Text style={styles.text}>Password</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='phone'
          type='font-awesome'
          color='#D50000' />
        {auth?.currentUser?.phoneNumber === null && <>
          <Text style={styles.text}>No added yet</Text>
        </>}
        {auth?.currentUser?.phoneNumber !== null && <>
          <Text style={styles.text}>{auth?.currentUser?.email}</Text>
        </>}
      </View>
      <Button raised type="outline" title="Edit user" containerStyle={styles.button} onPress={() => navigation.navigate("EditProfile")} />
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <Icon style={styles.icon}
              name='question'
              type='font-awesome'
              color='#D50000' />
            <Text h3>Are you sure you want to log out?</Text>
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => setVisible(false)} >
            <Button raised title="No, cancel" type="outline" onPress={() => setVisible(false)} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => setVisible(false)} >
            <Button raised title="Yes, log me out" type="outline" onPress={logout} />
          </TouchableOpacity>
        </View>
      </ModalPoup>
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='users'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>Share with friends</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='comment'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>Feedback</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='question-circle'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>Help</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='info-circle'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>About</Text>
      </View>
      <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.5} style={styles.infoContainer}>
        <Icon style={styles.icon}
          name='sign-out'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: "white",
    height: "100%"
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "white"
  },
  headerSubtitle: {
    fontSize: 25,
    fontWeight: "400",
    color: "white"
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
    width: '100%',
    justifyContent: "center"
  }
})
