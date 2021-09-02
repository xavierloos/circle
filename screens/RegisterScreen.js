import React, { useState, useLayoutEffect } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Input, Text, Icon } from "react-native-elements"
import { StatusBar } from 'expo-status-bar'
import { auth } from "../firebase"
import { color } from 'react-native-reanimated'

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: false,
      headerStyle: { backgroundColor: "#D50000" },
      headerBackTitle: false,
      borderWidth: 0,
      headerShown: false
    });
  }, [navigation])

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: firstName,
          displaySurname: surname,
          photoURL: imageUrl || "http://icons.iconarchive.com/icons/pelfusion/long-shadow-media/512/Contact-icon.png",
        })
      })
      .catch((error) => alert(error.message))
  }
  return (
    // <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <View style={styles.headerCircle}>
        <Text style={styles.headerTitle}>CIRCLE</Text>
      </View>
      <View style={styles.formContainer}>
        <KeyboardAvoidingView behavior="padding">
          <StatusBar style="light" />
          <View style={styles.inputContainer}>
            <Text h2 style={styles.slogan}>
              <Text style={styles.span}>Register</Text>
              <Text> now and start talkin' to your friends!</Text>
            </Text>
            <View style={styles.inputs}>
              <Icon
                name='user'
                type='antdesign'
                color='#D50000'
              />
              <View style={styles.inputs}>
                <Input
                  containerStyle={styles.inputName}
                  type="text"
                  placeholder="Name"
                  autoFocus
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                />
                <Input
                  containerStyle={styles.inputName}
                  type="text"
                  placeholder="Lastname"
                // value={firstName}
                // onChangeText={(text) => setFirstName(text)}
                />
              </View>

            </View>
            <View style={styles.inputs}>
              <Icon
                name='mail'
                type='antdesign'
                color='#D50000'
              />
              <Input containerStyle={styles.input} type="email" placeholder="Email" autoCapitalize="none" value={email} onChangeText={(text) => setEmail(text)} />
            </View>
            <View style={styles.inputs}>
              <Icon
                name='lock'
                type='antdesign'
                color='#D50000'
              />
              <Input containerStyle={styles.input} secureTextEntry autoCapitalize="none" type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
            </View>
            <View style={styles.inputs}>
              <Icon
                name='picture'
                type='antdesign'
                color='#D50000'
              />
              <Input containerStyle={styles.input} type="text" autoCapitalize="none" placeholder="Profile picture URL" value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} />
            </View>
          </View>
          {/* <Button raised disabled={!password} containerStyle={styles.button} raised onPress={register} title="Register" /> */}
          <TouchableOpacity style={styles.button} onPress={register}>
            <Text style={styles.buttonText}>
              Register
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>


    // </ScrollView>

  )
}
export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  headerCircle: {
    width: "100%",
    height: 400,
    backgroundColor: "#D50000",
    borderRadius: 2000,
    top: -180,
    left: -0,
    justifyContent: "flex-end",
    alignItems: 'center'
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 60,
    color: "white",
    marginBottom: 50,
    letterSpacing: 7
  },
  formContainer: {
    height: "auto",
    alignItems: 'center',
    backgroundColor: "transparent",
    top: -200
  },
  slogan: {
    fontWeight: "300",
    color: "#9A9A9A",
    paddingTop: 30
  },
  span: {
    fontWeight: "800",
    color: "#D50000"
  },
  inputContainer: {
    width: "70%",
  },
  inputs: {
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  inputName: {
    width: "50%",
    textTransform: 'lowercase',
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
  input: {
    width: "100%",
    textTransform: 'lowercase',
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
  button: {
    width: 200,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#D50000"
  },
  button: {
    width: 200,
    marginTop: 10,
  }
})