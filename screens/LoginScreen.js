import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Input, Image, Text } from "react-native-elements"
import { StatusBar } from "expo-status-bar";

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <View>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst4.depositphotos.com%2F6381748%2F27917%2Fv%2F450%2Fdepositphotos_279171494-stock-illustration-hand-wave-waving-hi-or.jpg&f=1&nofb=1"
        }}
        style={styles.logo}
      />
      <Text h2>Mate</Text>
      <View style={styles.inputContainer}>
        <Input type="email" placeholder="Email" autoFocus value={email} onChangeText={(text)=> setEmail(text)}/>
        <Input type="password" placeholder="Password" value={password} onChangeText={(text)=> setPassword(text)}/>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  inputContainer: {
  }
})
