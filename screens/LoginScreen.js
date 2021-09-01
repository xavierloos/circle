import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button, StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Input, Icon, Text } from "react-native-elements"
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
      {/* <ScrollView style={styles.scroll}> */}
      <View style={styles.formContainer}>
        <KeyboardAvoidingView behavior="padding" >
          <StatusBar style="light" />
          <View style={styles.inputContainer}>
            <Text h2 style={styles.slogan}>
              <Text style={styles.span}>Login</Text>
              <Text> to create a Circle or register to get started!</Text>
            </Text>
            <Input
              style={styles.input}
              type="email"
              autoCapitalize="none"
              placeholder="Email"
              // autoFocus
              value={email}
              onChangeText={(text) => setEmail(text)}
              leftIcon={<Icon name="at" type="font-awesome" size={30} color="#D50000" />}
            />
            <Input secureTextEntry type="password" autoCapitalize placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={singIn} leftIcon={<Icon name="lock" type="font-awesome" size={30} color="#D50000" />} />
            <TouchableOpacity style={styles.button} onPress={singIn}>
              <Text style={styles.buttonText}>
                Login
              </Text>
            </TouchableOpacity>
            {/* <Button color="red" containerStyle={styles.button} title="Press me" onPress={singIn} */}
            {/* <Button raised disabled={!password && !email} title="Login" containerStyle={styles.button} onPress={singIn} /> */}
            {Platform.OS === 'ios' && <>
              <Text style={styles.textConnect}>Connect with: </Text>
              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={loginFacebook}>
                  <Icon
                    name='facebook'
                    type='font-awesome'
                    color='white'
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon
                    name='google'
                    type='font-awesome'
                    color='white'
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon
                    name='github'
                    type='font-awesome'
                    color='white'
                  />
                </TouchableOpacity>
                {/* <Button type="clear" containerStyle={styles.buttonFacebook} onPress={loginFacebook} icon={<Icon name="facebook" size={40} color="red" />} /> */}
              </View>
            </>}
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.optionBar}>
        <TouchableOpacity>
          <Text>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.optionText}>Register <Icon
            name='chevron-right'
            type='font-awesome'
            color='#D50000'
          /></Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "transparent",
    top: -200,

  },
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  headerCircle: {
    width: "100%",
    height: 400,
    backgroundColor: "#D50000",
    borderRadius: 2000,
    top: -180,
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
  formContainer: {
    height: "auto",
    alignItems: 'center',
    backgroundColor: "transparent",
    top: -200,
  },
  slogan: {
    fontWeight: "500",
    color: "#9A9A9A",
    paddingVertical: 30,
  },
  span: {
    fontWeight: "800",
    color: "#D50000",
  },
  inputContainer: {
    width: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  input: {
    textTransform: 'lowercase'
  },
  button: {
    width: 200,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#D50000"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 15,
  },
  socialButton: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#D50000",
    justifyContent: "center",
    alignItems: 'center',
  },
  socialContainer: {

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  textConnect: {
    marginTop: 20,
    fontWeight: "600",
    color: "#808080",
  },
  buttonFacebook: {
    marginTop: 10,
    backgroundColor: "white"
  },
  optionBar: {
    position: "absolute",
    elevation: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: "white",
    borderColor: "#D50000",
    borderWidth: 0.25,
    borderRadius: 15,
    height: 50,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.5
  },
  optionText: {
    fontWeight: "600",
    color: "#D50000",
    display: "flex",
    flexDirection: "row",
    alignSelf: 'center',
    // alignContent: "center",
    justifyContent:"center",
    textAlignVertical:"center"
  }
})