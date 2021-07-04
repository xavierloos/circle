import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Input, Icon, Text } from "react-native-elements"
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase"
import Expo from "expo";
import { Facebook } from "expo";
import * as WebBrowser from 'expo-web-browser';
// import { MonoText } from "../components/StyledText";

export default class LoginScreen extends React.Component {
  async logIn() {
    const {
      type,
      token
    } = await WebBrowser.openBrowserAsync(`https://graph.facebook.com/me?access_token=165654778951149`)
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >

          <View style={styles.welcomeContainer}>
            {/* <Image
              source={require("../assets/images/expo-wordmark.png")}
              style={styles.welcomeImage}
            /> */}
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={() => this.logIn()} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>
                Login with Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            Exponent Facebook Login
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 80
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 140,
    height: 38,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 23,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 24,
    color: "white",
    padding: 10,
    backgroundColor: "#3b5998"
  }
});

// const LoginScreen = ({ navigation }) => {

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) { navigation.replace("Home") }
//     })
//     return unsubscribe
//   }, [])

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitle: "CIRCLE",
//       headerStyle: { backgroundColor: "#D50000" },
//       headerTitleStyle: { color: "white" },
//       headerTintColor: "white",
//     })
//   }, [navigation])

//   const singIn = () => {
//     auth
//       .signInWithEmailAndPassword(email, password)
//       .catch((error) => alert(error))
//   }

//   let loginFacebook = async () => {
//     // const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('165654778951149', { permissions: ['public-profile', 'email'] })
//     console.log("this:" + token + type)
//     const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
//       "165654778951149", { permissions: ["public_profile"] }
//     );
//     console.log("this:" + token + type)
//     console.log(type)
//     if (type === 'success') {

//     } else {
//       alert(type)
//     }
//   }

//   return (
//     <ScrollView style={styles.scroll}>
//       <KeyboardAvoidingView behavior="padding" style={styles.container}>
//         <StatusBar style="light" />
//         <Text h2 style={styles.title}>Login</Text>
//         <View style={styles.inputContainer}>
//           <Input type="email" placeholder="Email" autoFocus value={email} onChangeText={(text) => setEmail(text)} leftIcon={<Icon name="at" type="font-awesome" size={30} color="#D50000" />} />
//           <Input type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={singIn} leftIcon={<Icon name="lock" type="font-awesome" size={30} color="#D50000" />} />
//         </View>
//         <Button raised disabled={!password && !email} title="Login" containerStyle={styles.button} onPress={singIn} />
//         <Button raised title="Register" type="outline" containerStyle={styles.button} onPress={() => navigation.navigate("Register")} />
//         <Button title="Facebook" type="outline" containerStyle={styles.button} onPress={loginFacebook} />
//       </KeyboardAvoidingView>
//     </ScrollView>
//   )
// }
// export default LoginScreen
// const styles = StyleSheet.create({
//   scroll: {
//     backgroundColor: "white",
//     paddingTop: 50
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: "white"
//   },
//   title: {
//     marginBottom: 50,
//     fontWeight: "700",
//     color: "#D50000"
//   },
//   inputContainer: {
//     width: 300,
//   },
//   button: {
//     width: 200,
//     marginTop: 10,
//     color: "red"
//   }
// })
