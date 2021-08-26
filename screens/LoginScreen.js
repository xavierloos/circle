import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Button, Input, Icon, Text } from "react-native-elements"
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase"
import * as Facebook from 'expo-facebook'

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
      headerTitle: false,
      headerStyle: { backgroundColor: "#D50000" },
      headerBackTitle: false,
      borderWidth: 0,
      headerShown: false

    })
  }, [navigation])

  const singIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error))
  }

  const loginFacebook = async () => {
    try {
      await Facebook.initializeAsync({ appId: '165654778951149', });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile', "email"] });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/v2.5/me?fields=email,name,address,picture.type(large)&access_token=${token}`);
        const data = await response.json();
        if (data) { navigation.replace("Home") }
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerCircle}>
        <Text style={styles.headerTitle}>CIRCLE</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
          <StatusBar style="light" />
          <View style={styles.inputContainer}>
            <Text h2 style={styles.title}>Login</Text>
            <Input style={styles.input} type="email" autoCapitalize="none" placeholder="Email" autoFocus value={email} onChangeText={(text) => setEmail(text)} leftIcon={<Icon name="at" type="font-awesome" size={30} color="#D50000" />} />
            <Input secureTextEntry type="password" autoCapitalize placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={singIn} leftIcon={<Icon name="lock" type="font-awesome" size={30} color="#D50000" />} />
          </View>
          <Button raised disabled={!password && !email} title="Login" containerStyle={styles.button} onPress={singIn} />
          <Button raised title="Register" type="outline" containerStyle={styles.button} onPress={() => navigation.navigate("Register")} />
          {Platform.OS === 'ios' && <>
            <Text style={styles.textConnect}>Connect with: </Text>
            <Button type="clear" containerStyle={styles.buttonFacebook} onPress={loginFacebook} icon={<Icon name="facebook" size={40} color="red" />} />
          </>}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "transparent",

  },
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  formContainer: {
    alignItems: 'center',
    // padding: 10,
    backgroundColor: "white",
  },
  headerCircle: {
    width: "100%",
    height: 400,
    backgroundColor: "#D50000",
    borderRadius: 2000,
    top: -200,
    left: -0,
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 60,
    color: "white",
    marginBottom: 50,
    letterSpacing: 7
  },
  title: {
    fontWeight: "700",
    color: "#D50000"
  },
  inputContainer: {
    width: 300,
  },
  input: {
    textTransform: 'lowercase'
  },
  button: {
    width: 200,
    marginTop: 10,
    color: "red"
  },
  textConnect: {
    marginTop: 20,
    fontWeight: "500",
    color: "#D50000"
  },
  buttonFacebook: {
    marginTop: 10,
    backgroundColor: "white"
  }
})