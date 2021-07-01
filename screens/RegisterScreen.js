import React, { useState, useLayoutEffect } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native'
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
      headerTitle: "CIRCLE",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerBackTitle: "Login",
    });
  }, [navigation])

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: firstName,
          photoURL: imageUrl || "http://icons.iconarchive.com/icons/pelfusion/long-shadow-media/512/Contact-icon.png",
        })
      })
      .catch((error) => alert(error.message))
  }
  return (
    <ScrollView style={styles.scroll}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style="light" />
        <Text h2 style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <Input style={styles.input} type="text" placeholder="First name" autoFocus value={firstName} onChangeText={(text) => setFirstName(text)} leftIcon={<Icon name="user" type="font-awesome" size={30} color="#D50000" style={{ marginRight: 10 }} />} />
          <Input type="text" placeholder="Surname" autoFocus value={surname} onChangeText={(text) => setSurname(text)} leftIcon={<Icon name="id-card" type="font-awesome" size={30} color="#D50000" style={{ marginRight: 10 }} />} />
          <Input type="email" placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} leftIcon={<Icon name="at" type="font-awesome" size={30} color="#D50000" style={{ marginRight: 10 }} />} />
          {/* secureTextEntry */}
          <Input type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} leftIcon={<Icon name="lock" type="font-awesome" size={30} color="#D50000" style={{ marginRight: 10 }} />} />
          <Input type="text" placeholder="Profile picture URL" value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} leftIcon={<Icon name="photo" type="font-awesome" size={30} color="#D50000" style={{ marginRight: 10 }} />} />
        </View>
        <Button raised disabled={!password} containerStyle={styles.button} raised onPress={register} title="Register" />
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </ScrollView>

  )
}
export default RegisterScreen;
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
    paddingTop:100
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 50,
    fontWeight: "700",
    color: "#D50000"
  },
  inputContainer: {
    width: 300
  },
  input: {
  },
  button: {
    width: 200,
    marginTop: 10,
  }
})