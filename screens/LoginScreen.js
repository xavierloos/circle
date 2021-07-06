import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Input, Icon, Text } from "react-native-elements"
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase"
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-facebook'

// export default class LoginScreen extends React.Component {
//   async logIn() {
//     try { 
//       await Facebook.initializeAsync({ appId: '165654778951149', });
//       const { type,  token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile']});
//       if (type === 'success') {
//         // Get the user's name using Facebook's Graph API
//         const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
//         console.log('Logged in!', `Hi ${(await response.json()).photoURL}!`);
//       } else {
//         // type === 'cancel'
//       }
//     } catch ({ message }) {
//       console.log(`Facebook Login Error: ${message}`);
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
//           <View style={styles.welcomeContainer}>
//           </View>
//           <View style={styles.helpContainer}>
//             <TouchableOpacity onPress={() => this.logIn()} style={styles.helpLink}>
//               <Text style={styles.helpLinkText}>
//                 Login with Facebook
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//         <View style={styles.tabBarInfoContainer}>
//           <Text style={styles.tabBarInfoText}>
//             Exponent Facebook Login
//           </Text>
//         </View>
//       </View>
//     );
//   }
// }

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
    try {
      await Facebook.initializeAsync({ appId: '165654778951149', });
      const { type,  token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile']});
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
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