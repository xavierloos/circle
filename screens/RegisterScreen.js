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
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <StatusBar style="light" />
          <Text h2 style={styles.title}>Register</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.input} type="text" placeholder="First name" autoFocus value={firstName} onChangeText={(text) => setFirstName(text)} leftIcon={<Icon name="user" type="font-awesome" size={30} color="#D50000" style={{ marginRight: 10 }} />} />
            <Input type="email" placeholder="Email" autoCapitalize="none" value={email} onChangeText={(text) => setEmail(text)} leftIcon={<Icon name="at" type="font-awesome" size={30} color="#D50000" style={{ marginRight: 10 }} />} />
            <Input secureTextEntry autoCapitalize="none" type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} leftIcon={<Icon name="lock" type="font-awesome" size={30} color="#D50000" style={{ marginRight: 10 }} />} />
            <Input type="text" autoCapitalize="none" placeholder="Profile picture URL" value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} leftIcon={<Icon name="photo" type="font-awesome" size={30} color="#D50000" style={{ marginRight: 10 }} />} />
          </View>
          <Button raised disabled={!password} containerStyle={styles.button} raised onPress={register} title="Register" />
          <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
      </View>
    </View>


    // </ScrollView>

  )
}
export default RegisterScreen;
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
    paddingTop: 50
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