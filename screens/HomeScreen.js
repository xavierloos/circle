import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { StatusBar } from 'expo-status-bar'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { auth, db } from '../firebase'

const HomeScreen = ({ navigation }) => {
  console.log(auth?.currentUser?.email)
  console.log(auth?.currentUser?.photoURL)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "hiMate Chat",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "black",
      headerRight: () => (
        <View style={{ marginRight: 10, flexDirection:"row", justifyContent:"space-between",alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 5 }}>
            <AntDesign name="camera" size={24} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 5 }}>
            <Avatar rounded source={{ uri: "http://icons.iconarchive.com/icons/pelfusion/long-shadow-media/512/Contact-icon.png" }} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 5 }}>
            <Avatar rounded source={{ uri: "http://icons.iconarchive.com/icons/pelfusion/long-shadow-media/512/Contact-icon.png" }} />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  return (

    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )

}

export default HomeScreen

const styles = StyleSheet.create({})
