import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Icon, Text } from "react-native-elements"
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase"

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

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h2 style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Input type="email" placeholder="Email" autoFocus value={email} onChangeText={(text) => setEmail(text)} leftIcon={<Icon name="at" type="font-awesome" size={30} color="#D50000" />} />
        <Input type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={singIn} leftIcon={<Icon name="lock" type="font-awesome" size={30} color="#D50000" />} />
      </View>
      <Button disabled={!password} title="Login" containerStyle={styles.button} onPress={singIn} />
      <Button title="Register" type="outline" containerStyle={styles.button} onPress={() => navigation.navigate("Register")} />
    </KeyboardAvoidingView>
  )
}
export default LoginScreen
const styles = StyleSheet.create({
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
  }
})
