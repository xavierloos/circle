import React, { useState, useLayoutEffect } from 'react'
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Button, Input, Text } from "react-native-elements"
import { StatusBar } from 'expo-status-bar'
import { auth } from "../firebase"

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to login",
    });
  }, [navigation])

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.update({
          displayName: name,
          photoURL: avatar || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9LeJajtN75YM4qNKou-0ewHaHa%26pid%3DApi&f=1"
        })
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={styles.title}>Create an account</Text>
      <View style={styles.inputContainer}>
        <Input type="text" placeholder="Full name" autoFocus value={name} onChangeText={(text) => setName(text)} />
        <Input type="email" placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
        <Input type="password" secureTextEntry placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
        <Input type="text" placeholder="Profile picture URL" value={avatar} onChangeText={(text) => setAvatar(text)} onSubmitEditing={register} />
      </View>
      <Button containerStyle={styles.button} raised onPress={register} title="Register" />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 50
  },
  inputContainer: {
    width: 300
  },
  button: {

    width: 200,
    marginTop: 10,
  }
})