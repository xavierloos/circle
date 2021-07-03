import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Input, Icon, Text } from "react-native-elements"
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase"
import { color } from 'react-native-reanimated'
import { Constants } from "expo"
import Expo from "expo"

const id = '165654778951149'
const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) { navigation.replace("Home") }
    })
    return unsubscribe
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "CIRCLE",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    })
  }, [navigation])

  const singIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error))
  }

  const loginFacebook = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(id, { permissions: ['public-profile', 'email'] })

    if (type === 'success') {

    } else {
      alert(type)
    }
  }

  return (
    <ScrollView style={styles.scroll}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style="light" />
        <Text h2 style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <Input type="email" placeholder="Email" autoFocus value={email} onChangeText={(text) => setEmail(text)} leftIcon={<Icon name="at" type="font-awesome" size={30} color="#D50000" />} />
          <Input type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={singIn} leftIcon={<Icon name="lock" type="font-awesome" size={30} color="#D50000" />} />
        </View>
        <Button raised disabled={!password && !email} title="Login" containerStyle={styles.button} onPress={singIn} />
        <Button raised title="Register" type="outline" containerStyle={styles.button} onPress={() => navigation.navigate("Register")} />
        <Button title="Facebook" type="outline" containerStyle={styles.button} onPress={loginFacebook} />
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
export default LoginScreen
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
    paddingTop: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "white"
  },
  title: {
    marginBottom: 50,
    fontWeight: "700",
    color: "#D50000"
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
    color: "red"
  }
})
