import React, { useState, useEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image, Text } from "react-native-elements"
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

  const singIn = () => { }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst4.depositphotos.com%2F6381748%2F27917%2Fv%2F450%2Fdepositphotos_279171494-stock-illustration-hand-wave-waving-hi-or.jpg&f=1&nofb=1"
        }}
        style={styles.logo}
      />
      
      <Text h2>Mate</Text>
      <View style={styles.inputContainer}>
        <Input type="email" placeholder="Email" autoFocus value={email} onChangeText={(text) => setEmail(text)} />
        <Input type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
      </View>
      <Button title="Login" containerStyle={styles.button} onPress={singIn} />
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
  logo: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  }
})
