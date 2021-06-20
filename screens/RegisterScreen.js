import React, { useState, useLayoutEffect } from 'react'
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Button, Input, Text } from "react-native-elements"
import { StatusBar } from 'expo-status-bar'
import { auth } from "../firebase"

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation])
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl || "http://icons.iconarchive.com/icons/pelfusion/long-shadow-media/512/Contact-icon.png",
        })
      })
      .catch((error) => alert(error.message))
  }
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={styles.title}>Create an account</Text>
      <View style={styles.inputContainer}>
        <Input type="text" placeholder="Full name" autoFocus value={name} onChangeText={(text) => setName(text)} />
        <Input type="email" placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
        {/* secureTextEntry */}
        <Input type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
        <Input type="text" placeholder="Profile picture URL" value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} />
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